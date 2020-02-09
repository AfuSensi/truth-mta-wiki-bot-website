<template>
  <v-container fluid fill-height>
    <v-row class="text-center">
      <v-col>
        <h1>Log In</h1>
        <p>To access the this page you must be logged in</p>

        <v-btn x-large :href="loginUrl" color="primary">Log In</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "login",
  computed: {
    ...mapState(["loginUrl"])
  },
  mounted() {},
  methods: {},
  components: {},
  data() {
    return {};
  }
};
</script>
<style></style>
