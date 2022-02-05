<template>
  <section id="content">
    <div class="real-container real-app">
      <div id="products_cont row">
        <div
          class="product col-md-3"
          v-for="product of products"
          :key="product.slug"
        >
          <div>
            <router-link :to="`/products/${product.slug}`">
              <img
                src="https://dessign.net/shopper-woocommerce-theme/wp-content/uploads/2015/03/modern-chair-black1-360x360.jpg"
                class="
                  attachment-home-small-box
                  size-home-small-box
                  wp-post-image
                "
                alt=""
                loading="lazy"
              />
            </router-link>
          </div>
          <div class="sb_title">
            <router-link :to="`/products/${product.slug}`">
              {{ product.title }}
            </router-link>
          </div>

          <div class="prod_meta">
            <div class="sb_price">
              <span class="price">
                <span class="real-app-Price-amount amount">
                  <span class="real-app-Price-currencySymbol">$</span>
                  {{ product.price }}
                </span>
              </span>
            </div>
          </div>
        </div>

        <!-- NEW LINE -->
        <div class="product clear"></div>

        <!-- LAST BOX for the Home containers -->
        <div class="product product_last"></div>
      </div>

      <div class="clear"></div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src
// import components
import { AXIOS as axios } from "@/utils/http-common";

export default {
  name: "Home",
  data() {
    return {
      products: [],
      errors: [],
    };
  },

  // Fetches posts when the component is created.
  async mounted() {
    try {
      const response = await axios.get(`products`);
      this.products = response.data.data;
    } catch (e) {
      this.errors.push(e);
    }
  },
};
</script>
