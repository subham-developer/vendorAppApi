import express from "express";
import { login } from "../../Controller/Auth/Login.controller.js";
const router = express.Router();


router.post('/login',login);

export default router;