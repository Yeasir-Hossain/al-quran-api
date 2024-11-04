import { Response, NextFunction } from "express";
import { Req } from "../../utils/types";
import HttpError from "../../errors/httpError";
import { verse } from "al-quran-sdk";

export const getVerseByChapter = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { chapter_number } = req.params;
  if (!chapter_number ||
    chapter_number.toString().trim().length === 0 ||
    isNaN(+chapter_number)) throw new HttpError('Chapter ID is required', 400);
  const verses = await verse.getVerseByChapter(chapter_number, req.query);
  return res.status(200).json({
    status: 200,
    message: 'Verse retrieved successfully',
    data: verses
  });
};

export const getVerseByPage = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { page_number } = req.params;
  if (!page_number ||
    page_number.toString().trim().length === 0 ||
    isNaN(+page_number)) throw new HttpError('Page Number is required', 400);
  const verses = await verse.getVerseByPage(page_number, req.query);
  return res.status(200).json({
    status: 200,
    message: 'Verse retrieved successfully',
    data: verses
  });
};

export const getVerseByJuz = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { juz_number } = req.params;
  if (!juz_number ||
    juz_number.toString().trim().length === 0 ||
    isNaN(+juz_number)) throw new HttpError('Juz Number is required', 400);
  const verses = await verse.getVerseByJuz(juz_number, req.query);
  return res.status(200).json({
    status: 200,
    message: 'Verse retrieved successfully',
    data: verses
  });
};

export const getVerseByHizbNumber = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { hizb_number } = req.params;
  if (!hizb_number ||
    hizb_number.toString().trim().length === 0 ||
    isNaN(+hizb_number)) throw new HttpError('Hizb Number is required', 400);
  const verses = await verse.getVerseByJuz(hizb_number, req.query);
  return res.status(200).json({
    status: 200,
    message: 'Verse retrieved successfully',
    data: verses
  });
};

export const getVerseByRubElHizb = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { rub_el_hizb_number } = req.params;
  if (!rub_el_hizb_number ||
    rub_el_hizb_number.toString().trim().length === 0 ||
    isNaN(+rub_el_hizb_number)) throw new HttpError('Rub El Hizb Number is required', 400);
  const verses = await verse.getVerseByRubElHizbNumber(rub_el_hizb_number, req.query);
  return res.status(200).json({
    status: 200,
    message: 'Verse retrieved successfully',
    data: verses
  });
};

export const getVerseBySpecificKey = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { verse_key } = req.params;
  if (!verse_key ||
    verse_key.toString().trim().length === 0) throw new HttpError('Verse Key is required', 400);
  const verses = await verse.getSpecificVerseByVerseKey(verse_key, req.query);
  return res.status(200).json({
    status: 200,
    message: 'Verse retrieved successfully',
    data: verses
  });
};

export const getRandomAyah = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const ayah = await verse.getRandomAyah(req.query);
  return res.status(200).json({
    status: 200,
    message: 'Random ayah retrieved successfully',
    data: ayah
  });
};