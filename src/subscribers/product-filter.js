class ProductFilterSubscriber {
    constructor({ productFilterService, eventBusService }) {
      this.productFilterService_ = productFilterService;
      eventBusService.subscribe("order.placed", this.handleProducts);
    }
    handleProducts = async (data) => {
      this.productFilterService_.updateSales(data.id);
    };
  }
  export default ProductFilterSubscriber;