import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getAllJuzs } from "./entity";

const router: Router = Router();

router.get('/juzs', asyncHandler(getAllJuzs));

export default router;