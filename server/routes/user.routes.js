import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser } from "../controllers/user.controller.js"


const userRoute = express.Router()

userRoute.get("/currentuser", isAuth, getCurrentUser)



export default userRoute