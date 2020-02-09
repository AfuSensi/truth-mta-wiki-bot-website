<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col>
        <h1 class="notfound-topText">404</h1>
        <h1>Oh no! Page not found</h1>
        <p class="my-5" v-text="dadJoke"></p
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "notfound",
  computed: {},
  mounted() {
    this.getDadJoke();
  },
  methods: {
    async getDadJoke() {
      const res = await this.$axios.get("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json"
        }
      });

      if (res && res.status === 200 && res.data && res.data.joke) {
        this.dadJoke = res.data.joke;
      }
    }
  },
  components: {},
  data() {
    return {
      dadJoke: ""
    };
  }
};
</script>
<style scoped>
.notfound-topText {
  font-size: 10vw;
  color: #7289da;
  text-shadow: 1px -1px #455384, 2px -2px #455384, 3px -3px #455384,
    4px -4px #455384, 5px -5px #455384;
}
</style>
