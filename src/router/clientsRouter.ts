import express from "express";
import { ClientController } from "../controller/ClientController";

export const clientRouter = express.Router()

const clientController = new ClientController()

clientRouter.post("/register", clientController.register)

clientRouter.get("/all", clientController.getAllClients)