import { Router } from "express";
import { createAdminProduct, getImageKitAuth, listAdminProducts, requireAdmin, updateAdminProduct,deleteAdminProduct } from "../controllers/adminController";


const router=Router();

router.use(requireAdmin);
router.get("/imagekit/auth",getImageKitAuth)
router.get("/product",listAdminProducts)
router.post("/product",createAdminProduct)
router.patch("/products/:id",updateAdminProduct)
router.delete("/products/:id",deleteAdminProduct)


export default router