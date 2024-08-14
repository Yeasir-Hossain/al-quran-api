import { Router } from "express";

// Version 1 routes.
import imageRoute from "../services/image/route";
import userRoute from "../services/user/route";
import chapterRoute from "../services/chapters/route";
import juzRoute from "../services/juz/route";
import resourceRoute from "../services/resources/route";
import verseRoute from "../services/verse/route";
import quranRoute from "../services/quran/route";
import audioRoute from "../services/audio/route";

const router: Router = Router();

const v1 = [userRoute, imageRoute, chapterRoute, juzRoute, resourceRoute, verseRoute, quranRoute, audioRoute];

router.use("/api/v1", v1);

export default router;
