import { Router } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { getASingleTafsir, getASingleTranslation, getGlyphCodesOfAyahV1, getGlyphCodesOfAyahV2, getImaleiSimpleTextScriptOfAyah, getIndoPakScriptOfAyah, getUthmaniScriptOfAyah, getUthmaniSimpleScriptOfAyah, getUthmaniTajweedScriptOfAyah } from './entity';

const router: Router = Router();

router.get('/quran/verses/indopak', asyncHandler(getIndoPakScriptOfAyah));

router.get('/quran/verses/uthmani_tajweed', asyncHandler(getUthmaniTajweedScriptOfAyah));

router.get('/quran/verses/uthmani', asyncHandler(getUthmaniScriptOfAyah));

router.get('/quran/verses/uthmani_simple', asyncHandler(getUthmaniSimpleScriptOfAyah));

router.get('/quran/verses/imlaei', asyncHandler(getImaleiSimpleTextScriptOfAyah));

router.get('/quran/translations/:translation_id', asyncHandler(getASingleTranslation));

router.get('/quran/tafsirs/:tafsir_id', asyncHandler(getASingleTafsir));

router.get('/quran/verses/code_v1', asyncHandler(getGlyphCodesOfAyahV1));

router.get('/quran/verses/code_v2', asyncHandler(getGlyphCodesOfAyahV2));

export default router;