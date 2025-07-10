import express from "express";
import { createRoom , getRooms } from "../controllers/roomController";

const router = express.Router();


router.post("/create" , createRoom);
router.get("/get", getRooms);
