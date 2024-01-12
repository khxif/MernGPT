import { Router } from "express";
import {
  UserDetails,
  loginUser,
  registerUser,
  userLogout,
} from "../controllers/UserController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details", UserDetails);
router.get("/logout", userLogout);

export default router;
