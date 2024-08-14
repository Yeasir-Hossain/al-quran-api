import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  getAllAudioFilesofARecitation,
  getAllChaptersAudioOfAReciter,
  getAyahRecitationForSpecificAyah,
  getAyahRecitationForSpecificHizb,
  getAyahRecitationForSpecificMadaniMushafPage,
  getAyahRecitationForSpecificRubelHizb,
  getAyahRecitationsForSpecificJuz,
  getAyahRecitationsForSpecificSurah,
  getChaptersAudioOfAReciter,
  getListOfChapterReciters,
  getRecitations
} from "./entity";

const router: Router = Router();

router.get("/chapter_recitations/:id/:chapter_number", asyncHandler(getChaptersAudioOfAReciter));

router.get("/chapter_recitations/:id", asyncHandler(getAllChaptersAudioOfAReciter));

router.get("/resources/recitations", asyncHandler(getRecitations));

router.get("/quran/recitations/:recitation_id", asyncHandler(getAllAudioFilesofARecitation));

router.get("/resources/chapter_reciters", asyncHandler(getListOfChapterReciters));

router.get("/recitations/:recitation_id/by_chapter/:chapter_number", asyncHandler(getAyahRecitationsForSpecificSurah));

router.get("/recitations/:recitation_id/by_juz/:juz_number", asyncHandler(getAyahRecitationsForSpecificJuz));

router.get("/recitations/:recitation_id/by_page/:page_number", asyncHandler(getAyahRecitationForSpecificMadaniMushafPage));

router.get("/recitations/:recitation_id/by_rub/:rub_el_hizb_number", asyncHandler(getAyahRecitationForSpecificRubelHizb));

router.get("/recitations/:recitation_id/by_hizb/:hizb_number", asyncHandler(getAyahRecitationForSpecificHizb));

router.get("/recitations/:recitation_id/by_ayah/:ayah_key", asyncHandler(getAyahRecitationForSpecificAyah));

export default router;
