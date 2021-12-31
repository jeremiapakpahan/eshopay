import { Router } from "express";
//import indexController from "../controllers/indexController";
import IndexCtrl from "../controllers/indexController";


const router = Router()

//router.post("/:id", IndexCtrl.CartController.create)
//router.post("/:id", IndexCtrl.Orders.create)
router.post("/", IndexCtrl.CartController.summaryCart,IndexCtrl.Orders.updateStock)


//router.post("/", IndexCtrl.Orders.isCartExist, IndexCtrl.Orders.rekap, IndexCtrl.Orders.create)

// router.post("/createOrder", 
// IndexCtrl.Orders.isCartExist, 
// IndexCtrl.Orders.rekap, 
// IndexCtrl.Orders.getOrderNumber, 
// IndexCtrl.Orders.createOrder)

//router
router.post("/checkout",
    IndexCtrl.CartController.summaryCart,
    IndexCtrl.Orders.getOrderNumber,
    IndexCtrl.Orders.newOrder,
    IndexCtrl.Orders.updateStock,
    IndexCtrl.Orders.updateStatus);

export default router
