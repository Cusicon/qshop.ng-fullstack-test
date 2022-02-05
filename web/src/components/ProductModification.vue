<template>
  <div class="product-modification">
    <div class="single_post_cont">
      <div class="single_inside_content">
        <div class="woocommerce">
          <div class="woocommerce-notices-wrapper"></div>
          <br />
          <h1>Modification History</h1>

          <table
            class="
              shop_table shop_table_responsive
              cart
              woocommerce-cart-form__contents
            "
            cellspacing="0"
          >
            <thead>
              <tr>
                <th class="product-thumbnail">Image</th>
                <th class="product-name">Product</th>
                <th class="product-date-updated">Date Updated</th>
                <th class="product-what-was-modified">What was modified</th>
                <th class="product-quantity">Balance</th>
              </tr>
            </thead>
            <tbody>
              <!-- v-FOR here (modificationArray) -->
              <tr class="woocommerce-cart-form__cart-item cart_item">
                <td class="product-thumbnail">
                  <a href="/single-product"
                    ><img
                      width="50"
                      height="50"
                      src="https://dessign.net/shopper-woocommerce-theme/wp-content/uploads/2015/03/modern-chair-black1-300x300.jpg"
                      class="
                        attachment-woocommerce_thumbnail
                        size-woocommerce_thumbnail
                      "
                      alt=""
                      loading="lazy"
                    />
                  </a>
                </td>

                <td class="product-name" data-title="Product">
                  <a href="/single-product"> Design and Relax </a>
                </td>

                <td class="product-date-updated" data-title="Date-Added">
                  <span class="woocommerce-Price-amount amount">
                    2022-02-03
                  </span>
                </td>

                <td
                  class="product-what-was-modified"
                  data-title="What Was Modified"
                >
                  <span class="woocommerce-Price-amount amount">
                    modified price: 1450.99, quantity: 180, and description:
                    this is an updated product two!
                  </span>
                </td>

                <td class="product-quantity" data-title="Quantity">
                  <div class="quantity">
                    <label class="screen-reader-text" for="product-quantity"
                      >Quantity</label
                    >
                    <input
                      type="number"
                      id="product-quantity"
                      class="input-text qty text"
                      step="1"
                      min="1"
                      max=""
                      name="product-quantity"
                      value="1"
                      title="Quantity"
                      size="4"
                      inputmode="numeric"
                      disabled
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <br /><br />
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductModification",
  props: {
    productId: String,
  },
  data() {
    return {
      modificationArray: [],
    };
  },
  async mounted() {
    try {
      // Create Route and Consume
      const response = await axios.get(`/products/history/${this.product._id}`);
      this.modificationArray = response.data.data;
    } catch (err) {
      console.log(err);
    }
  },
};
</script>
