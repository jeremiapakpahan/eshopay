import { Router } from "express";
//import indexController from "../controllers/indexController";
import IndexCtrl from "../controllers/indexController";


const router = Router()

//router.post("/:id", IndexCtrl.CartController.create)
router.get("/", IndexCtrl.CartController.findAll)
router.get("/:id", IndexCtrl.CartController.findOne)
router.post("/", IndexCtrl.CartController.create, IndexCtrl.ProductController.getProd, IndexCtrl.Line_items.create)
router.put("/:id", IndexCtrl.CartController.update)
router.delete("/:id",IndexCtrl.CartController.deleteRow)




export default router

