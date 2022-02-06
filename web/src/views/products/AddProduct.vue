<template>
  <div class="add-product">
    <section id="content">
      <div class="container">
        <div class="single_post_cont">
          <div class="single_inside_content">
            <div class="woocommerce">
              <br />
              <h1>Add Product</h1>

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
                    required
                    v-model="form.title"
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
                    v-model="form.description"
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
                    required
                    v-model="form.category"
                  >
                    <option value="">Select a Category</option>
                    <option
                      :value="cat.title"
                      v-for="cat of categories"
                      :key="cat._id"
                    >
                      {{ cat.title.replace("-", " ").toNameCase() }}
                    </option>
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
                  />
                </p>

                <p class="form-row form-row-wide">
                  <label for="product_expiry_date"
                    >Expiry Date<span class="required">*</span></label
                  >
                  <input
                    type="date"
                    class="input-text"
                    name="product_expiry_date"
                    id="product_expiry_date"
                    autocomplete="product_expiry_date"
                    required
                    v-model="form.exp_date"
                  />
                </p>

                <p class="form-row form-row-wide">
                  <label for="product_images"
                    >Product Image(s)<span class="required">*</span></label
                  >
                  <input
                    type="file"
                    accept="image/*"
                    class="input-text"
                    name="product_images"
                    id="product_images"
                    autocomplete="product_images"
                    required
                    @change="onChange"
                  />
                </p>
                <br /><br />

                <p class="form-row">
                  <button
                    :disabled="isSubmitting"
                    type="submit"
                    class="button product-action-view"
                    name="login"
                    value="Log in"
                  >
                    Create Product
                  </button>
                </p>
              </form>
            </div>
          </div>

          <br /><br />
        </div>

        <div class="clear"></div>
      </div>
    </section>
    <div class="clear"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import components
import { AXIOS as axios } from "@/utils/http-common";

export default {
  name: "AddProduct",
  data() {
    return {
      isSubmitting: false,
      form: {
        title: "",
        description: "",
        price: "",
        qty: "",
        images: [],
        exp_date: "",
        category: "",
      },
      categories: [],
      errors: [],
    };
  },
  methods: {
    async onChange(event) {
      this.changedImage = event.target.files[0];
    },
    async submit() {
      try {
        this.isSubmitting = true;
        const formData = new FormData();
        formData.append("file_url", this.changedImage);
        const img_response = await axios.post(
          `/upload/media?where=image`,
          formData
        );

        this.form.images.push(img_response.data.data.path);

        await axios.post(`/products/add`, this.form);
        this.$router.push("/products");
        this.isSubmitting = false;
      } catch (err) {
        this.isSubmitting = false;
        this.errors.push(err);
      }
    },
  },

  // Fetches posts when the component is created.
  async mounted() {
    try {
      const response = await axios.get(`/category`);
      this.categories = response.data.data;
    } catch (err) {
      this.errors.push(err);
    }
  },
};
</script>
