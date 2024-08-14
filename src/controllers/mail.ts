import nodemailer, { SentMessageInfo } from "nodemailer";
import { MailOptions, SMTPConfig } from "../utils/types";

export default class MailService {
    private static instance: MailService;
    private transporter!: nodemailer.Transporter;

    static getInstance() {
        if (!MailService.instance) {
            MailService.instance = new MailService();
        }
        return MailService.instance;
    }

    //for test purpose only
    async createLocalConnection() {
        let account = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });
        if (await this.transporter.verify()) console.log("=> Mail Service Started");
    }

    async createConnection() {
        const smtpOptions: SMTPConfig = {
            host: process.env.SMTP_HOST!,
            port: parseInt(process.env.SMTP_PORT!),
            // cause of secure connection of server unable to use the secure connection
            secure: process.env.SMTP_TLS === "yes" ? true : false,
            auth: {
                user: process.env.SMTP_USER!,
                pass: process.env.SMTP_PASSWORD!,
            },
        };
        this.transporter = nodemailer.createTransport(smtpOptions);
        if (await this.transporter.verify()) console.log("=> Mail Service started");
    }

    async sendMail(
        options: MailOptions,
        cb?: (err: Error | null, info?: SentMessageInfo) => void
    ) {
        try {
            const res: SentMessageInfo = await this.transporter.sendMail({
                from: options.from,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
            });
            if (cb) cb(null, res);
            else return res;
        } catch (err: any) {
            console.error(err);
            if (cb) cb(err);
            else throw err;
        }
    }

    async verifyConnection() {
        return this.transporter.verify();
    }

    get getTransporter() {
        return this.transporter;
    }
}

