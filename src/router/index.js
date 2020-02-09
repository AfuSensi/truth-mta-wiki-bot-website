import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Callback from "../views/Callback.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";
import Commands from "../views/Commands.vue";
import Dashboard from "../views/Dashboard.vue";
import Guildlist from "../views/Dashboard/GuildList.vue";
import GuildSettings from "../views/Dashboard/GuildSettings.vue";
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "",
        metaTags: [
          {
            name: "description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          },
          {
            property: "og:description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          }
        ]
      }
    },
    {
      path: "/callback",
      name: "callback",
      component: Callback,
      meta: {
        title: "Login Callback",
        metaTags: [
          {
            name: "description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          },
          {
            property: "og:description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          }
        ]
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Login",
        metaTags: [
          {
            name: "description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          },
          {
            property: "og:description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          }
        ]
      }
    },
    {
      path: "/commands",
      name: "commands",
      component: Commands,
      meta: {
        title: "Commands",
        metaTags: [
          {
            name: "description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          },
          {
            property: "og:description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          }
        ]
      }
    },
    {
      path: "/dashboard",

      component: Dashboard,
      meta: {
        title: "Dashboard",
        metaTags: [
          {
            name: "description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          },
          {
            property: "og:description",
            content: "Discord bot for fetching Multi Theft Auto wiki articles."
          }
        ]
      },
      children: [
        {
          path: "/",
          name: "guildlist",
          component: Guildlist,
          meta: {
            title: "Dashboard",
            metaTags: [
              {
                name: "description",
                content:
                  "Discord bot for fetching Multi Theft Auto wiki articles."
              },
              {
                property: "og:description",
                content:
                  "Discord bot for fetching Multi Theft Auto wiki articles."
              }
            ]
          }
        },
        {
          path: "guild/:id",
          name: "guildsettings",
          component: GuildSettings,
          meta: {
            title: "Guild Settings",
            metaTags: [
              {
                name: "description",
                content:
                  "Discord bot for fetching Multi Theft Auto wiki articles."
              },
              {
                property: "og:description",
                content:
                  "Discord bot for fetching Multi Theft Auto wiki articles."
              }
            ]
          }
        }
      ]
    },

    { path: "/404", component: NotFound },
    { path: "*", redirect: "/404" }
  ],
  mode: "history"
});
export default router;

// Navigation guard
import store from "../store";
router.beforeEach((to, from, next) => {
  if (to.path === "/callback") {
    if (typeof to.query.code !== "string") {
      // Callback does not include code
      return next("/");
    }
  } else if (to.path.startsWith("/dashboard")) {
    if (store.getters.isLoggedIn) {
      return next();
    }
    // Set redirect path to go to after logging in
    localStorage.setItem("afterLoginRedirect", to.path);
    return next("/login");
  } else if (to.path === "/login") {
    if (store.getters.isLoggedIn) {
      return next("/");
    }
  }
  next();
});
