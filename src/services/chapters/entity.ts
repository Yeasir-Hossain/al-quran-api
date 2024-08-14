import { Response, NextFunction } from "express";
import { Req } from "../../utils/types";
import { quranApi } from "../../controllers/quranApi";
import HttpError from "../../errors/httpError";

const ALLOWED_QUERY = new Set(["language"]);

export const getListOfChapters = async (
  req: Req,
  res: Response,
  _next: NextFunction
): Promise<Response> => {
  const isValidQuery = Object.keys(req.query).every((key) => ALLOWED_QUERY.has(key));
  if (!isValidQuery) throw new HttpError('Query Not Allowed', 400);
  const chapters = await quranApi.chapter.listChapters(req?.query?.language as string || 'en');
  return res.status(200).json({
    status: 200,
    message: 'Chapters retrieved successfully',
    data: chapters,
  });
};

export const getOneChapter = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError('Chapter ID is Required', 400);
  const isValidQuery = Object.keys(req.query).every((key) => ALLOWED_QUERY.has(key));
  if (!isValidQuery) throw new HttpError('Query Not Allowed', 400);
  const chapter = await quranApi.chapter.getChapter(+id, req?.query?.language as string || 'en');
  return res.status(200).json({
    status: 200,
    message: 'Chapter retrieved successfully',
    data: chapter,
  });
};

export const getChapteInfo = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { chapter_id } = req.params;
  if (!chapter_id ||
    chapter_id.toString().trim().length === 0 ||
    isNaN(parseInt(chapter_id))) throw new HttpError('Chapter ID is Required', 400);
  const isValidQuery = Object.keys(req.query).every((key) => ALLOWED_QUERY.has(key));
  if (!isValidQuery) throw new HttpError('Query Not Allowed', 400);
  const chapterInfo = await quranApi.chapter.getChapterInfo(+chapter_id, req?.query?.language as string || 'en');
  return res.status(200).json({
    status: 200,
    message: 'Chapter Info retrieved successfully',
    data: chapterInfo,
  });
};

