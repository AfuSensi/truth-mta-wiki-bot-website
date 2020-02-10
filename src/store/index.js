import Vue from "vue";
import Vuex from "vuex";
import router from "../router";

Vue.use(Vuex);

// state
const state = {
  loginUrl: `https://discordapp.com/api/oauth2/authorize?client_id=${
    process.env.VUE_APP_DISCORD_CLIENT_ID
  }&response_type=code&scope=identify%20guilds&redirect_uri=${encodeURIComponent(
    process.env.VUE_APP_API_CALLBACK_URL
  )}`,
  accessToken: null,
  loggingIn: false,
  loginError: null,
  user: null,
  dashboardGuildList: null
};

// getters
const getters = {
  isLoggedIn: state => {
    return state.accessToken && state.user ? true : false;
  }
};

// actions
const actions = {
  redirectOnFetch() {
    if (localStorage.getItem("afterLoginRedirect")) {
      router.push(localStorage.getItem("afterLoginRedirect"));
      localStorage.removeItem("afterLoginRedirect");
    }
  },
  doLogin({ commit, dispatch }, code) {
    commit("loginStart");

    this._vm.$axios
      .post("oauth/callback", {
        code,
        redirectUri: process.env.VUE_APP_API_CALLBACK_URL
      })
      .then(response => {
        localStorage.setItem("accessToken", response.data.access_token);
        // eslint-disable-next-line no-console
        // console.log(response.data);
        commit("loginStop", null);
        commit("updateAccessToken", response.data.access_token);
        commit("updateUserObject", response.data.user);
        // Check for redirect
        dispatch("redirectOnFetch");
      })
      .catch(error => {
        commit("loginStop", error.response.data.error);
        commit("updateAccessToken", null);
        // eslint-disable-next-line no-console
        console.log(error);
      });
  },
  doLogout({ commit }) {
    commit("logOut");
  },
  fetchAccessToken({ commit, dispatch }) {
    const token = localStorage.getItem("accessToken");
    commit("updateAccessToken", token);
    if (token && router.currentRoute.fullPath !== "/callback") {
      dispatch("fetchUserInfo");
    }
  },
  fetchUserInfo({ state, commit, dispatch }) {
    this._vm.$axios
      .get("oauth/user", {
        headers: {
          Authorization: state.accessToken,
          "Content-Type": "application/json",
          accept: "application/json"
        }
      })
      .then(res => {
        commit("updateUserObject", res.data);
        dispatch("redirectOnFetch");
      })
      .catch(() => {
        commit("updateUserObject", null);
      });
  },
  fetchDashboardList({ commit }) {
    this._vm.$axios
      .get("dashboard/list", {
        headers: {
          Authorization: state.accessToken,
          "Content-Type": "application/json",
          accept: "application/json"
        }
      })
      .then(res => {
        commit("updateDashboardGuildList", res.data);
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        commit("updateDashboardGuildList", null);
      });
  }
};

// mutations
const mutations = {
  loginStart: state => (state.loggingIn = true),
  loginStop: (state, errorMessage) => {
    state.loggingIn = false;
    state.loginError = errorMessage;
  },
  updateAccessToken: (state, accessToken) => {
    state.accessToken = accessToken;
  },
  updateUserObject: (state, obj) => {
    state.user = obj;
  },
  logOut: state => {
    localStorage.removeItem("afterLoginRedirect");
    localStorage.removeItem("accessToken");
    state.accessToken = null;
    state.loggingIn = false;
    state.loginError = null;
    state.user = null;
    state.dashboardGuildList = null;
    router.push("/");
  },
  updateDashboardGuildList: (state, value) => {
    state.dashboardGuildList = value;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
