<template>
  <div class="edit-product" v-if="product">
    <section id="content">
      <div class="container">
        <div class="single_post_cont">
          <div class="single_inside_content">
            <div class="woocommerce">
              <br />
              <h1>Edit Product</h1>

              <form
                @submit.prevent="submit"
                class="woocommerce-form woocommerce-form-login login"
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
                    :value="product.title.toNameCase()"
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
                    v-model="form.description"
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
                    v-model="form.price"
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
                    <option>{{ product.category.toNameCase() }}</option>
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
                    v-model="form.qty"
                    @change="neverBeLessThanProductQuantity"
                  />
                </p>

                <p class="form-row form-row-wide">
                  <label for="product_images"
                    >Product Image(s)<span class="required">*</span></label
                  >
                  <img
                    width="100"
                    height="100"
                    :src="`${appURL}${product.images[0]}`"
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
                    class="button product-action-view"
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

        <ProductModification :productId="product._id" :product="product" />
      </div>
    </section>
    <div class="clear"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import components
import { AXIOS as axios } from "@/utils/http-common";
import ProductModification from "@/components/ProductModification.vue";

export default {
  name: "AddProduct",
  components: {
    ProductModification,
  },
  data() {
    return {
      isSubmitting: false,
      product: null,
      form: {
        description: "",
        price: "",
        qty: "",
      },
      errors: [],
    };
  },
  methods: {
    async submit() {
      try {
        await axios.put(`/products/edit/${this.product._id}`, this.form);
        this.$router.push("/products");
      } catch (err) {
        this.errors.push(err);
      }
    },
    init() {
      this.form.description = this.product.description.toSentenceCase();
      this.form.price = this.product.price;
      this.form.qty = this.product.qty;
    },
    neverBeLessThanProductQuantity() {
      if (this.form.qty < this.product.qty) {
        this.form.qty = this.product.qty;
        alert(`Sorry, quantity can't be less than "${this.product.qty}"`);
      }
    },
  },

  // Fetches posts when the component is created.
  async mounted() {
    try {
      const response = await axios.get(`/products/${this.$route.params.slug}`);
      this.product = response.data.data;
      this.init();
      this.setAppTitle(`Edit - ${this.product.title.toNameCase()}`);
    } catch (err) {
      this.errors.push(err);
    }
  },
};
</script>
