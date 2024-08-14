import { Response, NextFunction } from "express";
import { Req } from "../../utils/types";
import { quranApi } from "../../controllers/quranApi";
import HttpError from "../../errors/httpError";

const ALLOWED_QUERY = new Set(["language", "fields", "chapter_number", "juz_number", "page_number", "hizb_number", "rub_el_hizb_number", "verse_key"]);

export const getChaptersAudioOfAReciter = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id, chapter_number } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError("Reciter ID is Required", 400);
  const audios = await quranApi.audio.getChaptersAudioOfAReciter(+id, +chapter_number);
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getAllChaptersAudioOfAReciter = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError("Reciter ID is Required", 400);
  const isValidQuery = Object.keys(req.query).every(key => ALLOWED_QUERY.has(key));
  if (!isValidQuery) throw new HttpError("Query Not Allowed", 400);
  const audios = await quranApi.audio.getAllChaptersAudioOfAReciter(+id, (req?.query?.language as string) || "en");
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getRecitations = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const isValidQuery = Object.keys(req.query).every(key => ALLOWED_QUERY.has(key));
  if (!isValidQuery) throw new HttpError("Query Not Allowed", 400);
  const audios = await quranApi.audio.getRecitations((req?.query?.language as string) || "en");
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getAllAudioFilesofARecitation = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError("Reciter ID is Required", 400);
  const isValidQuery = Object.keys(req.query).every(key => ALLOWED_QUERY.has(key));
  if (!isValidQuery) throw new HttpError("Query Not Allowed", 400);
  const audios = await quranApi.audio.getAllAudioFilesofARecitation(+id, req?.query);
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getListOfChapterReciters = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const isValidQuery = Object.keys(req.query).every(key => ALLOWED_QUERY.has(key));
  if (!isValidQuery) throw new HttpError("Query Not Allowed", 400);
  const audios = await quranApi.audio.getListOfChapterReciters((req?.query?.language as string) || "en");
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getAyahRecitationsForSpecificSurah = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id, chapter_number } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError("Reciter ID is Required", 400);
  const audios = await quranApi.audio.getAyahRecitationsForSpecificSurah(+id, +chapter_number);
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getAyahRecitationsForSpecificJuz = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id, juz_number } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError("Reciter ID is Required", 400);
  const audios = await quranApi.audio.getAyahRecitationsForSpecificJuz(+id, +juz_number);
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getAyahRecitationForSpecificMadaniMushafPage = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id, page_number } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError("Reciter ID is Required", 400);
  const audios = await quranApi.audio.getAyahRecitationForSpecificMadaniMushafPage(+id, +page_number);
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getAyahRecitationForSpecificRubelHizb = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id, rub_el_hizb_number } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError("Reciter ID is Required", 400);
  const audios = await quranApi.audio.getAyahRecitationForSpecificRubelHizb(+id, +rub_el_hizb_number);
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getAyahRecitationForSpecificHizb = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id, hizb_number } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError("Reciter ID is Required", 400);
  const audios = await quranApi.audio.getAyahRecitationForSpecificHizb(+id, +hizb_number);
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};

export const getAyahRecitationForSpecificAyah = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { id, ayah_key } = req.params;
  if (!id || id.toString().trim().length === 0 || isNaN(parseInt(id))) throw new HttpError("Reciter ID is Required", 400);
  const audios = await quranApi.audio.getAyahRecitationForSpecificAyah(+id, ayah_key);
  return res.status(200).json({
    status: 200,
    message: "Audios retrieved successfully",
    data: audios
  });
};
