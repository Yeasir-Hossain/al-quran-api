import { Response, NextFunction } from "express";
import { Req } from "../../utils/types";
import HttpError from "../../errors/httpError";
import { resources } from "al-quran-sdk";

export const getRecitationInfo = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { recitation_id } = req.params;
  if (!recitation_id ||
    recitation_id.toString().trim().length === 0 ||
    isNaN(parseInt(recitation_id))) throw new HttpError('Recitation ID is Required', 400);
  const recitaion = await resources.getRecitationInfo(recitation_id);
  return res.status(200).json({
    status: 200,
    message: 'Recitation Info retrieved successfully',
    data: recitaion,
  });
};

export const getTranslationInfo = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { translation_id } = req.params;
  if (!translation_id ||
    translation_id.toString().trim().length === 0 ||
    isNaN(parseInt(translation_id))) throw new HttpError('Translation ID is Required', 400);
  const translation = await resources.getTranslationInfo(translation_id);
  return res.status(200).json({
    status: 200,
    message: 'Translation Info retrieved successfully',
    data: translation,
  });
};

export const getTranslations = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { language } = req.query;
  if (language &&
    language.toString().trim().length === 0) throw new HttpError('Language Can not be empty', 400);
  const translations = await resources.getTranslations(language as string || 'en');
  return res.status(200).json({
    status: 200,
    message: 'Translations retrieved successfully',
    data: translations,
  });
};

export const getTafsirs = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { language } = req.query;
  if (language &&
    language.toString().trim().length === 0) throw new HttpError('Language Can not be empty', 400);
  const tafsirs = await resources.getTafsirs(language as string || 'en');
  return res.status(200).json({
    status: 200,
    message: 'Tafsirs retrieved successfully',
    data: tafsirs,
  });
};

export const getTafsirInfo = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { tafsir_id } = req.params;
  if (!tafsir_id ||
    tafsir_id.toString().trim().length === 0 ||
    isNaN(parseInt(tafsir_id))) throw new HttpError('Tafsir ID is Required', 400);
  const tafsir = await resources.getTafsirInfo(tafsir_id);
  return res.status(200).json({
    status: 200,
    message: 'Tafsir Info retrieved successfully',
    data: tafsir,
  });
};

export const getRecitationStyles = async (_req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const styles = await resources.getRecitationStyles();
  return res.status(200).json({
    status: 200,
    message: 'Recitation Styles retrieved successfully',
    data: styles,
  });
};

export const getAllLanguages = async (_req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const languages = await resources.getLanguages();
  return res.status(200).json({
    status: 200,
    message: 'Languages retrieved successfully',
    data: languages,
  });
};

export const getChapterInfos = async (_req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const chapterInfos = await resources.getChapterInfos();
  return res.status(200).json({
    status: 200,
    message: 'Chapter Infos retrieved successfully',
    data: chapterInfos,
  });
};

export const getVerseMedia = async (_req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const verseMedia = await resources.getVerseMedias();
  return res.status(200).json({
    status: 200,
    message: 'Verse Media retrieved successfully',
    data: verseMedia,
  });
};