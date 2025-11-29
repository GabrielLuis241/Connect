import { Router } from "express";
import { getUserDetailForSorteio } from "../controllers/adminSorteioController.js";

const router = Router();

// GET /admin/sorteio/users/:id
router.get("/users/:id", getUserDetailForSorteio);

export default router;
