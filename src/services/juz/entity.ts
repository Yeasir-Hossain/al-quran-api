import { Response, NextFunction } from "express";
import { Req } from "../../utils/types";
import { quranApi } from "../../controllers/quranApi";

export const getAllJuzs = async (_req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const juzs = await quranApi.juz.getAllJuzs();
  return res.status(200).json({
    status: 200,
    message: 'Juzs retrieved successfully',
    data: juzs
  });
};