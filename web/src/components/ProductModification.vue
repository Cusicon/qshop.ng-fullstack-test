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
            v-if="there_is_history"
          >
            <thead>
              <tr>
                <th class="product-thumbnail">Image</th>
                <th class="product-name">Product</th>
                <th class="product-date-updated">Date Updated</th>
                <th class="product-what-was-modified">What was modified</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="woocommerce-cart-form__cart-item cart_item"
                v-for="modification of modification_array"
                :key="modification._id"
              >
                <td class="product-thumbnail">
                  <router-link :to="`/products/${product.slug}`">
                    <img
                      width="50"
                      height="50"
                      :src="`${appURL}${product.images[0]}`"
                      class="
                        attachment-woocommerce_thumbnail
                        size-woocommerce_thumbnail
                      "
                      alt=""
                      loading="lazy"
                    />
                  </router-link>
                </td>

                <td class="product-name" data-title="Product">
                  <router-link :to="`/products/${product.slug}`">
                    {{ product.title.toNameCase() }}
                  </router-link>
                </td>

                <td class="product-date-updated" data-title="Date-Updated">
                  <span class="woocommerce-Price-amount amount">
                    {{ new Date(modification.createdAt).toDateString() }}
                  </span>
                </td>

                <td
                  class="product-what-was-modified"
                  data-title="What Was Modified"
                >
                  <span class="woocommerce-Price-amount amount">
                    {{ modification.what_happened.toSentenceCase() }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <table
            class="
              shop_table shop_table_responsive
              cart
              woocommerce-cart-form__contents
            "
            cellspacing="0"
            v-else
          >
            <thead>
              <tr>
                <th class="product-thumbnail">Image</th>
                <th class="product-name">Product</th>
                <th class="product-date-updated">Date Updated</th>
                <th class="product-what-was-modified">What was modified</th>
              </tr>
            </thead>
            <tbody>
              <tr class="woocommerce-cart-form__cart-item cart_item">
                <td colspan="4">
                  <center style="padding: 10px">No modifications yet!</center>
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
import { AXIOS as axios } from "@/utils/http-common";

export default {
  name: "ProductModification",
  props: {
    product: Object,
    productId: String,
  },
  data() {
    return {
      there_is_history: false,
      modification_array: [],
      errors: [],
    };
  },
  async mounted() {
    try {
      // Create Route and Consume
      const response = await axios.get(
        `/products/edit/${this.$props.productId}/history`
      );
      this.modification_array = response.data.data;
      this.there_is_history = this.modification_array[0] ? true : false;
    } catch (err) {
      this.errors.push(err);
    }
  },
};
</script>
