import { Router } from "express";

export default () => {
  const router = Router();
  router.get("/store/filtered-products", async (req, res) => {
    const filetredProductsService = req.scope.resolve("productFilterService");
    res.json({
      products: await filetredProductsService.getFilteredProducts(),
    });
  });
  return router;
};
