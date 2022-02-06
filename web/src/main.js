import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/style.css'
import './assets/css/mobile.css'

Vue.config.productionTip = false

Vue.mixin({
  data: function () {
    return {
      appURL: process.env.VUE_APP_MAIN_APP_URL,
      setAppTitle(title) {
        window.document.title = `${
          title ? title + ' :: ' : ''
        }Qshop.ng Fullstack Test App`
      },
    }
  },
})

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
