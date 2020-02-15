<template>
  <v-container fluid fill-height class="text-center">
    <v-row v-if="loggingIn">
      <v-col cols="12">
        <h1>Logging in</h1>
      </v-col>
      <v-col cols="12">
        <v-progress-circular
          :width="3"
          color="primary"
          indeterminate
          size="70"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row v-if="loginError">
      <v-col>
        <h1>Error logging in, Please try again</h1>
      </v-col>
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
