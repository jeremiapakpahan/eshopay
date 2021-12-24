import { Router } from "express";
import indexController from "../controllers/indexController";

const router = Router();

// router.post("/", indexController.CategoryController.create)
router.get("/", indexController.Line_items.findAll)
router.get("/:id", indexController.Line_items.findOne)
router.put("/:id", indexController.Line_items.update)
router.delete("/:id", indexController.Line_items.deleteRow)


export default router;
