import { Request } from 'express';

export interface Req extends Request {
    user?: User;
    files?: any;
    session?: string;
};

export interface User {
    id: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    avatar: string;
    role: string;
    phone: string;
    updatedAt: string;
    createdAt: string;
    status: string;
    __v: number;
};

export interface S3BucketOptions {
    secretAccessKey: string;
    accessKeyId: string;
    region: string;
    directory: string;
    mimeTypes: string[];
    maxSize: number;
}

export interface S3UpdateResult {
    key?: string;
    url?: string;
};

export interface CloudinaryConfig {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
};

export interface SMTPConfig {
    host: string;
    port: number;
    secure?: boolean;
    auth: {
        user: string;
        pass: string;
    };
}

export interface EmailFrom {
    name: string;
    address: string;
}

export interface MailOptions {
    from?: EmailFrom;
    to: string | string[];
    cc?: string | string[];
    bcc?: string | string[];
    subject: string;
    text?: string;
    html?: string;
}
