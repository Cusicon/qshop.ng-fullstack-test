<template>
  <div class="woocommerce">
    <div class="single-product">
      <div id="content">
        <div class="container">
          <div id="primary" class="content-area">
            <main id="main" class="site-main" role="main">
              <div class="woocommerce-notices-wrapper"></div>
              <div id="product-85" class="product" style="width: 100%">
                <div
                  class="
                    woocommerce-product-gallery
                    woocommerce-product-gallery--with-images
                    woocommerce-product-gallery--columns-4
                    images
                  "
                  data-columns="4"
                  style="opacity: 0; transition: opacity 0.25s ease-in-out"
                >
                  <div class="woocommerce-product-gallery__image">
                    <a
                      href="https://dessign.net/shopper-woocommerce-theme/wp-content/uploads/2015/03/modern-chair-black1.jpg"
                    >
                      <img
                        width="566"
                        height="569"
                        src="https://dessign.net/shopper-woocommerce-theme/wp-content/uploads/2015/03/modern-chair-black1.jpg"
                        alt=""
                        loading="lazy"
                      />
                    </a>
                  </div>
                </div>

                <div class="summary entry-summary">
                  <h1 class="product_title entry-title">{{ product.title }}</h1>
                  <p class="price">
                    <span class="woocommerce-Price-amount amount"
                      ><span class="woocommerce-Price-currencySymbol"
                        >&#36;</span
                      >{{ product.price }}</span
                    >
                  </p>
                  <div class="woocommerce-product-details__short-description">
                    <p>
                      {{ product.description }}
                    </p>
                  </div>

                  <div class="cart">
                    <div class="quantity" style="display: inline-block">
                      <label
                        class="screen-reader-text"
                        for="quantity_61fd64ff753f2"
                        >{{ product.title }}</label
                      >
                      <input
                        type="number"
                        id="quantity"
                        class="input-text qty text"
                        step="1"
                        min="1"
                        max=""
                        name="quantity"
                        value="1"
                        title="Qty"
                        size="4"
                        inputmode="numeric"
                      />
                    </div>

                    <button
                      class="single_add_to_cart_button button alt"
                      style="
                        display: inline-block;
                        margin-left: 5px;
                        background-color: #000000;
                        line-height: 0.5;
                      "
                    >
                      Add to cart
                    </button>
                  </div>

                  <div class="product_meta">
                    <span class="sku_wrapper"
                      >SKU: <span class="sku">Relax599</span></span
                    >

                    <span class="posted_in">
                      Categories: {{ product.category }},
                      <a
                        href="https://dessign.net/shopper-woocommerce-theme/product-category/all-product/"
                        rel="tag"
                        >All Product</a
                      >,
                      <a
                        href="https://dessign.net/shopper-woocommerce-theme/product-category/new-arrivals/"
                        rel="tag"
                        >New Arrivals</a
                      ></span
                    >
                  </div>
                </div>

                <div class="woocommerce-tabs wc-tabs-wrapper">
                  <ul class="tabs wc-tabs" role="tablist">
                    <li
                      class="description_tab"
                      id="tab-title-description"
                      role="tab"
                      aria-controls="tab-description"
                    >
                      <a href="#tab-description"> Description </a>
                    </li>
                  </ul>
                  <div
                    class="
                      woocommerce-Tabs-panel woocommerce-Tabs-panel--description
                      panel
                      entry-content
                      wc-tab
                    "
                    id="tab-description"
                    role="tabpanel"
                    aria-labelledby="tab-title-description"
                  >
                    <h2>Description</h2>

                    <p>
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import components
import { AXIOS as axios } from "@/utils/http-common";

export default {
  name: "SingleProduct",
  data() {
    return {
      product: {},
      errors: [],
    };
  },

  // Fetches posts when the component is created.
  async mounted() {
    try {
      const response = await axios.get(`products/${this.$route.params.slug}`);
      this.product = response.data.data;
    } catch (e) {
      this.errors.push(e);
    }
  },
};
</script>