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
  loginError: false,
  user: null,
  dashboardGuildList: null,
  loginRetry: 0
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
  doLogin({ commit, dispatch, state }, code) {
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
        commit("setLoginRetry", 0);
      })
      .catch(async error => {
        // eslint-disable-next-line no-console
        if (state.loginRetry >= 1) {
          commit("loginStop", true);
          commit("updateAccessToken", null);
          commit("setLoginRetry", 0);
          // eslint-disable-next-line no-console
          console.log(error.message || error);
        } else {
          commit("setLoginRetry", 1);
          await sleep(5000);
          dispatch("doLogin", code);
        }
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
  loginStart: state => {
    state.loggingIn = true;
    state.loginError = false;
  },
  loginStop: (state, errorMessage) => {
    state.loggingIn = false;
    state.loginError = errorMessage;
    state.loginRetry = 0;
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
  },
  setLoginRetry: (state, num) => {
    state.loginRetry = num;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

function sleep(duration) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, duration);
  });
}
