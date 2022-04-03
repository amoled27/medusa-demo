import { BaseService } from "medusa-interfaces";

class ProductFilterService extends BaseService {
  constructor({ productService, orderService }) {
    super();
    this.productService_ = productService;
    this.orderService_ = orderService;
  }
  async getFilteredProducts() {
    const products = await this.productService_.list(
      {
        status: ["published"],
      },
      {
        relations: [
          "variants",
          "variants.prices",
          "options",
          "options.values",
          "images",
          "tags",
          "collection",
          "type",
        ],
      }
    );
    const filteredProducts = products.filter((a) => {
      return a.handle === "sweatshirt" || a.handle === "sweatpants";
    });
    return filteredProducts;
  }
  async updateSales(orderId) {
    const order = await this.orderService_.retrieve(orderId, {
      relations: ["items", "items.variant", "items.variant.product"],
    });
    if (order.items && order.items.length) {
      for (let i = 0; i < order.items.length; i++) {
        const item = order.items[i];
        //retrieve product by id
        const product = await this.productService_.retrieve(
          item.variant.product.id,
          {
            relations: [
              "variants",
              "variants.prices",
              "options",
              "options.values",
              "images",
              "tags",
              "collection",
              "type",
            ],
          }
        );
        const sales =
          product.metadata && product.metadata.sales
            ? product.metadata.sales
            : 0;
        //update product
        await this.productService_.update(product.id, {
          metadata: { sales: sales + 1 },
          // inventory
        });
      }
    }
  }
}
export default ProductFilterService;
