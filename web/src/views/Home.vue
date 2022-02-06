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
                :src="`${appURL}${product.images[0]}`"
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
                  <span class="real-app-Price-currencySymbol">₦</span>
                  {{ product.price }}
                  (qty: {{ product.qty }})
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
      const response = await axios.get(`/products`);
      let all_products = [];

      for (const key in response.data.data) {
        if (Object.hasOwnProperty.call(response.data.data, key)) {
          const data = response.data.data[key];
          all_products.push(data);
        }
      }

      let new_all_products = all_products.filter(
        (prod) => new Date(prod.exp_date).getTime() > new Date().getTime()
      );

      const sortByCategory = function (a, b) {
        return a.category.localeCompare(b.category);
      };

      new_all_products = new_all_products.sort(sortByCategory);
      this.products = new_all_products;
      this.setAppTitle();
    } catch (err) {
      this.errors.push(err);
    }
  },
};
</script>
