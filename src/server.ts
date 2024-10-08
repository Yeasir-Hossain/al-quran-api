import { config } from 'dotenv';
config();

import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import express, { Request, Response } from 'express';
import actuator from 'express-actuator';
import { parse } from 'express-form-data';
import healthCheck from 'express-healthcheck';
import rateLimit from 'express-rate-limit';
import { Server, createServer } from 'http';
import morgan from 'morgan';
import methodOverride from 'method-override';

// Internal imports
import connectToDB from './db/connectToDB';
import session from './middleware/session';
import router from './routes';
import { setServerInstance } from './utils/eventHandler';
import SocketServer from './controllers/socket/socket';
import { socketAuth } from './controllers/socket/socketAuth';
import { events } from './controllers/socket/customEvents';
import errorHandler from './middleware/errorHandler';
import requestId from './middleware/requestId';
import { Req } from './utils/types';
import { LOGGER_FORMAT } from './utils/constants';

let ioServer: SocketServer;

// Express application configuration
const PORT = process.env.PORT || 5000;
const app: express.Application = express();
const server: Server = createServer(app);


// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(',').map((origin) => origin).filter(Boolean),
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
}));
app.use(actuator({
    basePath: '/health',
    infoGitMode: 'full',
    infoBuildOptions: {
        author: {
            name: "Pranta Das",
            email: "prantodas043@gmail.com",
            url: "http://github.com/Prantadas"
        },
        note: 'Made with ❤️ By Pranta Das'
    },
}));
app.use(compression());
app.use(helmet());
app.disable('x-powered-by');
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'You Have Bombered The API!'
}));
app.use('/health', healthCheck());
app.use(express.json({ limit: "50mb" }));
app.use(parse());
morgan.token('id', (req: Req) => {
    return req.id?.split('-')[0];
});
app.use(morgan(LOGGER_FORMAT));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());
app.use(requestId({
    setHeader: false
}));
// enabling xss protection
app.use((_req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// session hanlder
app.use(session);

// Routes setup
app.use(router);

// error middleware
app.use(errorHandler);

// Default routes
app.get('/', (_req: Request, res: Response,) => {
    return res.status(200).send("Wassup!!");
});

// Handle undefined reoutes
app.use("*", (_req: Request, res: Response) => {
    return res.status(200).send({ status: 200, message: 'This route does not exist' });
});


/**
 * Starts the server by establishing a connection to the database, initializing email and message queues,
 * and listening on the specified port.
 * @returns {Promise<void>} Resolves if the server starts successfully.
 * @throws {Error} If any error occurs during server startup, logs the error and exits the process with a non-zero status code.
 */
async function startServer(): Promise<void> {
    try {
        const dbStatus = await connectToDB();
        console.log(dbStatus);

        // Start server and set server instance
        const httpServer = server.listen(PORT, () => {
            console.log(`=> Server is running on port ${PORT}`);
        });

        ioServer = SocketServer.getInstance(httpServer, [socketAuth], events);
        setServerInstance(httpServer);
    } catch (error) {
        console.error('=> Failed to start server:', error);
        process.exit(1);
    }
};

export { startServer, ioServer };
