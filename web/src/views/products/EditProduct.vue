<template>
  <div class="edit-product">
    <section id="content">
      <div class="container">
        <div class="single_post_cont">
          <div class="single_inside_content">
            <div class="woocommerce">
              <br />
              <h1>Edit Product</h1>

              <form
                class="woocommerce-form woocommerce-form-login login"
                method="POST"
              >
                <p class="form-row form-row-wide">
                  <label for="product_name"
                    >Product Title<span class="required">*</span></label
                  >
                  <input
                    type="text"
                    class="input-text"
                    name="product_name"
                    id="product_name"
                    autocomplete="product_name"
                    value=""
                    disabled
                    required
                  />
                </p>

                <p class="form-row form-row-wide">
                  <label for="product_name"
                    >Description<span class="required">*</span></label
                  >
                  <textarea
                    name="product_description"
                    id="product_description"
                    autocomplete="product_description"
                    required
                  ></textarea>
                </p>

                <p class="form-row form-row-wide">
                  <label for="product_price"
                    >Price<span class="required">*</span></label
                  >
                  <input
                    type="number"
                    class="input-text"
                    name="product_price"
                    id="product_price"
                    autocomplete="product_price"
                    required
                    min="0"
                    value=""
                  />
                </p>

                <p class="form-row form-row-wide">
                  <label for="product_category"
                    >Category<span class="required">*</span></label
                  >
                  <select
                    name="product_category"
                    id="product_category"
                    autocomplete="product_category"
                    disabled
                    required
                  >
                    <option value="">Select a category</option>
                  </select>
                </p>

                <p class="form-row form-row-wide">
                  <label for="product_quantity"
                    >Quantity<span class="required">*</span></label
                  >
                  <input
                    type="number"
                    class="input-text"
                    name="product_quantity"
                    id="product_quantity"
                    autocomplete="product_quantity"
                    required
                    min="1"
                    value=""
                  />
                </p>

                <p class="form-row form-row-wide">
                  <label for="product_images"
                    >Product Image(s)<span class="required">*</span></label
                  >
                  <img
                    width="100"
                    height="100"
                    src="https://dessign.net/shopper-woocommerce-theme/wp-content/uploads/2015/03/modern-chair-black1-300x300.jpg"
                    class="
                      attachment-woocommerce_thumbnail
                      size-woocommerce_thumbnail
                    "
                    alt=""
                    loading="lazy"
                  />
                </p>
                <br /><br />

                <p class="form-row">
                  <button
                    type="submit"
                    class="
                      woocommerce-button
                      button
                      woocommerce-form-login__submit
                    "
                    name="login"
                    value="Log in"
                  >
                    Update Product
                  </button>
                </p>
              </form>
            </div>
          </div>

          <br /><br />
        </div>

        <div class="clear"></div>

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
    </section>
    <div class="clear"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import components

export default {
  name: "EditProduct",
  components: {
    // components...
  },
  data() {
    return {};
  },
  mounted() {
    console.log(this.$route.params.productId);
  },
};
</script>
