import { Router } from "express";
//import indexController from "../controllers/indexController";
import IndexCtrl from "../controllers/indexController";


const router = Router()

//router.post("/:id", IndexCtrl.CartController.create)
router.get("/", IndexCtrl.Orders.findAll)
router.get("/:id", IndexCtrl.Orders.findOne)
router.post("/:id", IndexCtrl.Orders.create)
router.put("/:id", IndexCtrl.Orders.update)
router.delete("/:id",IndexCtrl.Orders.deleteRow)

router.post("/", IndexCtrl.Orders.isCartExist, IndexCtrl.Orders.rekap, IndexCtrl.Orders.create)



export default router
