<template>
  <div class="all-products">
    <section id="content">
      <div class="container">
        <div class="single_post_cont">
          <div class="single_inside_content">
            <div class="woocommerce">
              <div class="woocommerce-notices-wrapper"></div>
              <br />
              <h1>
                All Products ({{ products.length }})
                <router-link
                  to="/add-product"
                  class="pull-right btn product-action-view"
                  style="color: #ffffff"
                >
                  <small class="fa fa-plus"></small> Add Product
                </router-link>
              </h1>

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
                    <th class="product-remove">Actions</th>
                    <th class="product-thumbnail">Image</th>
                    <th class="product-name">Product</th>
                    <th class="product-date-added">Date Added</th>
                    <th class="product-expiry-date">Expiry Date</th>
                    <th class="product-quantity">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="woocommerce-cart-form__cart-item cart_item"
                    v-for="product of products"
                    :key="product.slug"
                  >
                    <td class="product-actions">
                      <router-link
                        :to="`/products/${product.slug}`"
                        class="badge product-action-view"
                        style="margin: auto 2px;"
                        aria-label="View this item"
                      >
                        <small class="fa fa-eye"></small> view
                      </router-link>
                      <router-link
                        :to="`/products/${product.slug}/edit`"
                        class="badge product-action-edit"
                        style="margin: auto 2px;"
                        aria-label="Edit this
                        item"
                      >
                        <small class="fa fa-edit"></small> edit
                      </router-link>
                      <a
                        @click="deleteProduct(product)"
                        class="badge product-action-delete"
                        style="margin: auto 2px;"
                        aria-label="Remove this item"
                      >
                        <small class="fa fa-times"></small> delete
                      </a>
                    </td>

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
                        {{ product.title }}
                      </router-link>
                    </td>

                    <td class="product-date-added" data-title="Date-Added">
                      <span class="woocommerce-Price-amount amount">
                        {{ new Date(product.createdAt).toDateString() }}
                      </span>
                    </td>

                    <td class="product-expiry-date" data-title="Expiry-Date">
                      <span class="woocommerce-Price-amount amount">
                        {{ new Date(product.exp_date).toDateString() }}
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
                          :value="product.qty"
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
      <!--//container-->
    </section>
    <div class="clear"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import components
import { AXIOS as axios } from "@/utils/http-common";

export default {
  name: "AllProduct",
  data() {
    return {
      products: [],
      errors: [],
    };
  },

  methods: {
    async deleteProduct({ _id, title }) {
      try {
        const must_delete = confirm(
          `You are deleting "${title.toUpperCase()}". Continue?`
        );
        if (must_delete) {
          await axios.delete(`/products/delete/${_id}`);
          this.$router.go();
        }
      } catch (err) {
        this.errors.push(err);
      }
    },
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

      this.products = all_products;
    } catch (e) {
      this.errors.push(e);
    }
  },
};
</script>
