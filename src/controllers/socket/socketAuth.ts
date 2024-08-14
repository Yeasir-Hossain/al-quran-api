import { ISocket } from "./socket";

export async function socketAuth(socket: ISocket, next: (err?: Error) => void) {
    try {
        const token = (socket.handshake?.headers?.cookie || '')?.split(';')?.find(s => s.includes(`${process.env.SESSION_COOKIE_KEY}=`))?.
            replace(`${process.env.SESSION_COOKIE_KEY}=`, '')?.replace(/\s/g, '');
        socket.token = token;
        if (!token) return next();
        return next();
    } catch (err) {
        console.log(err);
        // next(new Error('Unauthorized connection'));
    }
};