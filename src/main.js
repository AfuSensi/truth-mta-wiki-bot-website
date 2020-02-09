import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueGitHubButtons from "vue-github-buttons";
import axios from "axios";
axios.defaults.baseURL = "https://www.truth.afusensi.xyz/api";
Vue.prototype.$axios = axios;

// Stylesheet
import "vue-github-buttons/dist/vue-github-buttons.css";

Vue.use(VueGitHubButtons);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
