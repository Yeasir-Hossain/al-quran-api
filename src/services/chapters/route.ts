import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getChapteInfo, getListOfChapters, getOneChapter } from "./entity";

const router: Router = Router();


router.get('/chapters', asyncHandler(getListOfChapters));

router.get('/chapters/:id', asyncHandler(getOneChapter));

router.get('/chapters/:chapter_id/info', asyncHandler(getChapteInfo));

export default router;