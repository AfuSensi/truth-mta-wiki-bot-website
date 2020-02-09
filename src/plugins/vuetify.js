import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#7289da",
        secondary: "#18191c",
        accent: "#ffffff",
        error: "#7c0000"
      }
    }
  }
});
