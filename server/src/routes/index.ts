import { Router } from "express";
import ChatRoutes from "./ChatRoutes";
import UserRoutes from "./UserRoutes";

const router = Router();

router.use("/user", UserRoutes);
router.use("/chat", ChatRoutes);

export default router;
