import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import './assets/css/mobile.css'
import { AXIOS as axios } from '@/utils/http-common'

Vue.config.productionTip = false

Vue.mixin({
  data() {
    return {
      isAuthenticated: false,
      appURL: process.env.VUE_APP_API_URL,
      setAppTitle(title) {
        window.document.title = `${
          title ? title + ' :: ' : ''
        }Qshop.ng Fullstack Test App`
      },
    }
  },
  async beforeCreate() {
    try {
      let response = await axios.get('/category')
      if (response.data.error == null) this.isAuthenticated = true

      // Goto Home if isAuthenticated
      if (
        (this.$route.path.includes('signup') ||
          this.$route.path.includes('login')) &&
        this.isAuthenticated
      )
        this.$router.push('/')
      // Allow Login and Sign Up only, if not isAuthenticated
      if (
        !(
          this.$route.path.includes('signup') ||
          this.$route.path.includes('login')
        ) &&
        !this.isAuthenticated
      )
        this.$router.push('/login')
    } catch (err) {
      console.log(err)
    }
  },
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
