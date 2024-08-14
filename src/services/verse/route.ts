import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getRandomAyah, getVerseByChapter, getVerseByHizbNumber, getVerseByJuz, getVerseByPage, getVerseByRubElHizb, getVerseBySpecificKey } from "./entity";

const router: Router = Router();

router.get('/verses/by_chapter/:chapter_number', asyncHandler(getVerseByChapter));

router.get('/verses/by_page/:page_number', asyncHandler(getVerseByPage));

router.get('/verses/by_juz/:juz_number', asyncHandler(getVerseByJuz));

router.get('/verses/by_hizb/:hizb_number', asyncHandler(getVerseByHizbNumber));

router.get('/verses/by_rub/:rub_el_hizb_number', asyncHandler(getVerseByRubElHizb));

router.get('/verses/by_key/:verse_key', asyncHandler(getVerseBySpecificKey));

router.get('/verses/random', asyncHandler(getRandomAyah));

export default router;