import { Response, NextFunction } from "express";
import { Req } from "../../utils/types";
import HttpError from "../../errors/httpError";
import { quran } from "al-quran-sdk";

export const getIndoPakScriptOfAyah = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const script = await quran.getIndoPakScriptOfAyah(req.query);
  return res.status(200).json({
    status: 200,
    message: 'IndoPak script of ayah retrieved successfully',
    data: script
  });
};

export const getUthmaniTajweedScriptOfAyah = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const script = await quran.getUthmaniTajweedScriptOfAyah(req.query);
  return res.status(200).json({
    status: 200,
    message: 'Uthmani Tawjeed script of ayah retrieved successfully',
    data: script
  });
};

export const getUthmaniScriptOfAyah = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const script = await quran.getUthmaniScriptOfAyah(req.query);
  return res.status(200).json({
    status: 200,
    message: 'Uthmani script of ayah retrieved successfully',
    data: script
  });
};

export const getUthmaniSimpleScriptOfAyah = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const script = await quran.getUthmaniSimpleScriptOfAyah(req.query);
  return res.status(200).json({
    status: 200,
    message: 'Uthmani Simple script of ayah retrieved successfully',
    data: script
  });
};

export const getImaleiSimpleTextScriptOfAyah = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const script = await quran.getImlaeiSimpleTextOfAyah(req.query);
  return res.status(200).json({
    status: 200,
    message: 'Imalei Simple Text retrieved successfully',
    data: script
  });
};

export const getASingleTranslation = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { translation_id } = req.params;
  if (!translation_id ||
    translation_id.toString().trim().length === 0 ||
    isNaN(parseInt(translation_id))) throw new HttpError('Translation ID is Required', 400);
  const script = await quran.getASingleTranslation(translation_id, req.query);
  return res.status(200).json({
    status: 200,
    message: 'Translation retrieved successfully',
    data: script
  });
};

export const getASingleTafsir = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const { tafsir_id } = req.params;
  if (!tafsir_id ||
    tafsir_id.toString().trim().length === 0 ||
    isNaN(parseInt(tafsir_id))) throw new HttpError('Tafsir ID is Required', 400);
  const script = await quran.getSingleTafsir(tafsir_id, req.query);
  return res.status(200).json({
    status: 200,
    message: 'Tafsir retrieved successfully',
    data: script
  });
};

export const getGlyphCodesOfAyahV1 = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const ayah = await quran.getGlyphCodesOfAyahV1(req.query);
  return res.status(200).json({
    status: 200,
    message: 'Ayah retrieved successfully',
    data: ayah
  });
};

export const getGlyphCodesOfAyahV2 = async (req: Req, res: Response, _next: NextFunction): Promise<Response> => {
  const ayah = await quran.getGlyphCodesOfAyahV2(req.query);
  return res.status(200).json({
    status: 200,
    message: 'Ayah retrieved successfully',
    data: ayah
  });
};