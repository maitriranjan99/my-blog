import { Router } from "express";
import { login } from "../controller/user.controller.js";

const router = Router();

router.route("/test").get(login);

export default router;
