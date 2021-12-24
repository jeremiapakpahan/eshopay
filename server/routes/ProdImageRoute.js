import { Router } from "express";
import IndexCtrl from "../controllers/indexController";
import UploadDownloadelper from "../middleware/UploadDownloadelper";

const router = Router()


router.post("/:id1/:id2", IndexCtrl.ProductImageController.create)
// router.post("/images", UploadDownloadHelper.uploadImages.IndexCtrl.ProductController.create1)
router.get("/", IndexCtrl.ProductController.findAll)
router.get("/findOne/:id", IndexCtrl.ProductController.findOne)
router.put("/:id1/:id2:/:id3", IndexCtrl.ProductController.update)
router.delete("/:id", IndexCtrl.ProductController.deleteRow)
router.post("/add", UploadDownloadelper.uploadImages,IndexCtrl.ProductImageController.create1)
//router.post("/images", UploadDownloadelper.uploadImages,IndexCtrl.ProductController.create1,IndexCtrl.CartController.create,IndexCtrl.Line_items.create)
router.get("/getProd", IndexCtrl.ProductController.getProd)

//router.post("/", IndexCtrl.ProductImageController.create)
export default router;


