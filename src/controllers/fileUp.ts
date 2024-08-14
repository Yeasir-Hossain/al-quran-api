import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

// include all the files extensions that are allowed to upload.
export const ALLOWED_FILES_EXTENSIONS: string[] = [];

const fileDir = path.join(process.cwd(), "files");
if (!existsSync) mkdirSync(fileDir);

// Use the function to upload files locally
export async function fileUp(link: string): Promise<string | null> {
    if (!link) return null;
    const extIndex = link.lastIndexOf(".");
    if (extIndex === -1) throw new Error("Link does not contain a file extension.");
    const ext = link.substring(extIndex + 1);
    if (!ALLOWED_FILES_EXTENSIONS.includes(ext.toLowerCase())) throw new Error("Invalid file extension.");
    const fileName = uuidv4() + "." + ext;
    const buffer = readFileSync(link);
    const filePath = path.join(fileDir, fileName);
    writeFileSync(filePath, buffer);
    return fileName;
}