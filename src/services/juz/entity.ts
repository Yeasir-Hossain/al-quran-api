import { Response, NextFunction } from "express";
import { Req } from "../../utils/types";
import { juz } from "al-quran-sdk";

export const getAllJuzs = async (_req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const juzs = await juz.getAllJuzs();
  return res.status(200).json({
    status: 200,
    message: 'Juzs retrieved successfully',
    data: juzs
  });
};