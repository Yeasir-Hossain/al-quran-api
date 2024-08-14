import { instrument } from '@socket.io/admin-ui';
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

export interface Middleware {
    (socket: ISocket, next: (err?: Error) => void): void;
};

export interface ISocket extends Socket {
    token?: string;
}

export interface SockeData {
    [key: string]: any;
};

export interface CustomEvent {
    event: string;
    cb: (socket: ISocket, ...args: any[]) => void;
};

export enum IoAdminMode {
    development = "development",
    production = "production",
}

export default class SocketServer {
    private static instance: SocketServer;
    private io: SocketIOServer;
    private middlewares: Middleware[];
    private eventListeners: CustomEvent[];
    // This is only for handling a few number of users, if the user count is more,
    // then use some different approach to handle the online users,
    // otherwise it might cause possible memory leaks issues.
    public onlineUsers: string[] = [];

    private constructor(server: HttpServer, middlewares: Middleware[] = [], events: CustomEvent[] = []) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: (process.env.CORS_ORIGIN as string).split(',').filter(Boolean),
                methods: ["GET", "POST"],
                credentials: true,
            },
        });
        console.log("=> Socket.io initialized");
        this.middlewares = middlewares;
        this.eventListeners = events;
        this.initialize();
    }

    public static getInstance(server: HttpServer, middleware: Middleware[] = [], eventListeners: CustomEvent[] = []): SocketServer {
        if (!SocketServer.instance) {
            SocketServer.instance = new SocketServer(server, middleware, eventListeners);
        }
        return SocketServer.instance;
    }

    private initialize() {
        this.setupConnection();
    }

    private setupMiddleware() {
        this.middlewares.forEach((mw) => {
            this.io.use(mw);
        });
    }

    private setupConnection() {
        (new Promise<void>((resolve) => {
            this.middlewares.forEach((mw) => {
                this.io.use(mw);
            });
            resolve();
        }))
            .then(() => {
                instrument(this.io, {
                    namespaceName: "/joltori",
                    mode: process.env.MODE !== 'development' ? IoAdminMode.production : IoAdminMode.development,
                    auth: {
                        type: "basic",
                        username: process.env.SOCKET_USER_NAME!,
                        password: process.env.SOCKET_PASSWORD!,
                    },
                });
            })
            .then(() => {
                this.io.on('connection', (socket: ISocket) => {
                    const token = socket.token!;
                    socket.join(token);

                    if (!this.onlineUsers.includes(token)) this.onlineUsers.push(token);

                    socket.on('disconnect', () => {
                        this.onlineUsers = this.onlineUsers.filter((user) => user !== socket.token);
                    });

                    this.eventListeners.forEach(({ event, cb }) => {
                        socket.on(event, (...args: any[]) => cb(socket, ...args));
                    });
                });
            })
            .catch((err) => console.log(err));
    }

    public broadcast(event: string, message: SockeData) {
        this.io.emit(event, message);
    }

    public broadcastToRoom(room: string, event: string, message: SockeData) {
        this.io.to(room).emit(event, message);
    }

    public registerEventListener(event: string, cb: (socket: ISocket, ...args: any[]) => void) {
        this.eventListeners.push({ event, cb });
    }
};