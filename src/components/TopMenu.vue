<template>
  <div>
    <v-app-bar elevate-on-scroll app color="#26262b">
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.smAndDown"
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>

      <v-img
        :src="require('../assets/logo.png')"
        alt="Logo"
        class="shrink mr-2"
        contain
        transition="scale-transition"
        width="60"
        max-height="90%"
        @click="$router.push('/')"
        style="cursor:pointer;"
      />

      <v-toolbar-title
        class="mr-5"
        @click="$router.push('/')"
        style="cursor:pointer;"
      >
        <b>Truth</b>
        <span class="font-weight-light" v-if="$vuetify.breakpoint.smAndUp">
          - MTA:SA Wiki Bot
        </span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <template v-if="$vuetify.breakpoint.mdAndUp">
        <v-btn
          v-for="route in routes"
          :key="route.name"
          :to="route.route"
          size="small"
          color="primary"
          text
          class="mx-1"
        >
          {{ route.name }}
        </v-btn>
      </template>

      <v-divider vertical class="mx-5"></v-divider>
      <!-- <v-btn text @click="logInButton" v-if="!isLoggedIn">
      Log In
    </v-btn> -->

      <div>
        <v-menu
          v-if="isLoggedIn"
          v-model="miniMenuValue"
          bottom
          nudge-bottom="40"
        >
          <template v-slot:activator="{ on }">
            <v-row
              no-gutters
              class="menuUserWrap flex-nowrap"
              align="center"
              v-on="on"
            >
              <v-col>
                <v-avatar left size="40" class="mr-2">
                  <img :src="user.avatarURL" />
                </v-avatar>
              </v-col>
              <v-col v-if="$vuetify.breakpoint.mdAndUp">
                <span class="menuUserName caption">{{ user.tag }}</span>
              </v-col>
              <v-col>
                <v-icon v-if="miniMenuValue">
                  mdi-chevron-up
                </v-icon>
                <v-icon v-else>
                  mdi-chevron-down
                </v-icon>
              </v-col>
            </v-row>
          </template>

          <v-list dense class="px-0">
            <v-list-item @click="doLogout">
              <v-list-item-content>
                <v-list-item-title> Log Out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn text v-else @click="logInButton" color="white">
          Log In
        </v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="drawer"
      app
    >
      <v-list nav dense>
        <v-list-item
          link
          :to="route.route"
          v-for="route in routes"
          :key="route.route"
          @click="drawer = false"
        >
          <v-list-item-title>
            {{ route.name }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "TopMenu",
  computed: {
    ...mapState(["accessToken", "loginUrl", "user"]),
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions(["doLogout"]),
    logInButton() {
      if (this.$route.path !== "/404") {
        localStorage.setItem("afterLoginRedirect", this.$route.path);
      }

      window.location.href = this.loginUrl;
    }
  },
  watch: {},
  data: () => ({
    drawer: false,
    miniMenuValue: false,
    routes: [
      { name: "Home", route: "/" },
      { name: "Commands", route: "/commands" },
      { name: "Dashboard", route: "/dashboard" }
    ]
  })
};
</script>

<style>
.menuUserWrap {
  cursor: pointer;
  user-select: none;
}
.menuUserWrap:hover {
  background: #3e3e3e;
}
.menuUserName {
  display: block;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
