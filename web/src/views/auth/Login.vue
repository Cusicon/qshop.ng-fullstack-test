<template>
  <div class="add-product">
    <section id="content">
      <div class="container">
        <div class="single_post_cont">
          <div class="single_inside_content">
            <div class="woocommerce">
              <br />
              <h1>Login</h1>

              <form
                @submit.prevent="submit"
                class="woocommerce-form woocommerce-form-login login"
              >
                <p class="form-row form-row-wide">
                  <label for="email"
                    >Email<span class="required">*</span></label
                  >
                  <input
                    type="email"
                    class="input-text"
                    name="email"
                    id="email"
                    autocomplete="email"
                    required
                    autofocus
                    v-model="form.email"
                  />
                </p>
                <p class="form-row form-row-wide">
                  <label for="password"
                    >Password<span class="required">*</span></label
                  >
                  <input
                    type="password"
                    class="input-text"
                    name="password"
                    id="password"
                    autocomplete="password"
                    required
                    v-model="form.password"
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
                    Login
                  </button>
                </p>
              </form>
            </div>
          </div>

          <router-link to="/signup">Don't have an account? Sign Up</router-link>

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
  name: "SignUp",
  data() {
    return {
      token: "",
      isSubmitting: false,
      form: {
        email: "",
        password: "",
      },
      errors: [],
    };
  },
  methods: {
    async submit() {
      try {
        this.isSubmitting = true;
        let response = await axios.post(`/signin`, this.form);

        this.token = response.data.data.token;

        localStorage.setItem("VzaWNvb", this.token);
        this.$router.go();
        this.isSubmitting = false;
      } catch (err) {
        this.isSubmitting = false;
        this.errors.push(err);
      }
    },
  },
  mounted() {
    this.setAppTitle("Login");
  },
};
</script>
