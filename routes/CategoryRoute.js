import { Router } from "express";
import indexController from "../controllers/indexController";

const router = Router();

router.post("/", indexController.CategoryController.create)
router.get("/", indexController.CategoryController.findAll)
router.get("/:id", indexController.CategoryController.findOne)
router.put("/:id", indexController.CategoryController.update)
router.delete("/:id", indexController.CategoryController.deleteRow)


export default router;
