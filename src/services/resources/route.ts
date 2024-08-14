import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getAllLanguages, getChapterInfos, getRecitationInfo, getRecitationStyles, getTafsirInfo, getTafsirs, getTranslationInfo, getTranslations, getVerseMedia } from "./entity";

const router: Router = Router();

router.get('/resources/recitations/:recitation_id/info', asyncHandler(getRecitationInfo));

router.get('/resources/translations/:translation_id/info', asyncHandler(getTranslationInfo));

router.get('/resources/translations', asyncHandler(getTranslations));

router.get('/resources/tafsirs', asyncHandler(getTafsirs));

router.get('/resources/tafsirs/:tafsir_id/info', asyncHandler(getTafsirInfo));

router.get('/resources/recitation_styles', asyncHandler(getRecitationStyles));

router.get('/resources/languages', asyncHandler(getAllLanguages));

router.get('/resources/chapter_infos', asyncHandler(getChapterInfos));

router.get('/resources/verse_media', asyncHandler(getVerseMedia));

export default router;