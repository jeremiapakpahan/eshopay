import { Router } from "express";
import IndexCtrl from '../controllers/indexController'

const router = Router();

// method post
router.get("/:id",IndexCtrl.UserController.findOne);
router.post("/login",IndexCtrl.UserController.signin)

export default router;