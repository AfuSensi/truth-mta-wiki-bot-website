<template>
  <v-container fluid fill-height>
    <v-row v-if="loggingIn">
      <v-col>
        <h1>Logging in</h1>
      </v-col>
    </v-row>
    <v-row v-if="loginError">
      <v-col> Error logging in: {{ loginError }} </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "callback",
  computed: {
    ...mapState(["loggingIn", "loginError", "accessToken"])
  },
  mounted() {
    this.handleAuth();
  },
  methods: {
    ...mapActions(["doLogin"]),
    async handleAuth() {
      // eslint-disable-next-line no-console

      if (typeof this.$route.query.code === "string") {
        this.doLogin(this.$route.query.code);
      }
    }
  },
  components: {},
  data() {
    return {};
  }
};
</script>
<style></style>
