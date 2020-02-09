<template>
  <v-container fluid class="home mx-0 px-0 mt-0 pt-0">
    <v-parallax
      dark
      :src="require('../assets/hero.png')"
      style="user-select:none;"
    >
      <v-row no-gutters align="center" justify="center">
        <v-col class="text-center" cols="12">
          <img
            :src="require('../assets/logo.png')"
            alt="logo"
            style="height:150px;width:150px;"
          />
          <h1 class="display-3">
            Truth
          </h1>
          <h2 class="font-weight-thin mt-3 mb-5">
            MTA:SA Wiki Discord Bot
          </h2>
          <vue-typer
            style="display:block;"
            class="headline font-weight-light mb-3"
            :text="typerText"
          ></vue-typer>
          <v-btn
            large
            class="my-5"
            color="primary"
            :disabled="!inviteUrl"
            :href="inviteUrl || '#'"
            target="_blank"
          >
            Invite to your server
          </v-btn>
        </v-col>
      </v-row>
    </v-parallax>

    <v-container fluid class="restrictWidth">
      <v-row>
        <v-col class="text-center">
          <h4 class="headline primary--text">
            Currently serving
            <b><ICountUp :delay="-1" :endVal="servedGuilds"/></b> guilds!
          </h4>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6">
          <v-col>
            <v-img :src="require('../assets/mtasalogo.png')"> </v-img>
          </v-col>
        </v-col>

        <v-col align-self="center" cols="12" sm="6">
          <h1>MTA Wiki Bot</h1>
          <p class="body-2">
            This <b>unofficial</b> MTA wiki bot is made to make Multi Theft Auto
            server development conversation easier by having easy access to
            articles without copy and pasting wiki URL's.
          </p>
          <p class="caption grey--text">
            This bot has no affiliation with Multi Theft Auto and is an open
            source project by community member
            <a
              href="https://forum.mtasa.com/profile/44273-afusensi/"
              target="_blank"
            >
              AfuSensi
            </a>
          </p>
          <v-btn
            class="mx-0"
            small
            color="secondary"
            href="https://mtasa.com/"
            target="_blank"
          >
            Visit mtasa.com
          </v-btn>
          <span class="mx-5" />
          <v-btn
            class="mx-0"
            small
            color="primary"
            href="https://mtasa.com/discord"
            target="_blank"
          >
            Join MTA's Discord
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 class="mb-5 pb-5">Features</h1>
        </v-col>
      </v-row>

      <v-lazy
        :options="{ threshold: 0.6 }"
        min-height="500"
        transition="slide-x-reverse-transition"
      >
        <v-row align="center">
          <v-col cols="12" sm="6" class="">
            <h2 class="display-1 mb-4">Fetch Articles</h2>
            <p>
              Easy and fast wiki article by using <code>.wiki query</code> or
              <code>`query`</code>. By default it returns page description,
              function and OOP syntax, parameters, returned values and a page
              image (if present) in a rich embed.
            </p>
            <p>
              The returned fields are configurable in the
              <router-link to="/dashboard">dashboard</router-link>.
            </p>
            <p>
              Be mindful of uppercase letters, as MTA's wiki is case sensitive
            </p>
          </v-col>
          <v-col cols="12" sm="6">
            <img
              eager
              min-height="500"
              :src="require('../assets/featuresgifs/wikiget.gif')"
              alt="Wiki get command"
              class="featureGif elevation-6"
            />
          </v-col>
        </v-row>
      </v-lazy>
      <v-divider class="my-5" />

      <v-lazy
        :options="{ threshold: 0.6 }"
        min-height="500"
        transition="slide-x-transition"
      >
        <v-row align="center">
          <v-col cols="12" sm="6" order="2" order-sm="0">
            <img
              eager
              min-height="500"
              :src="require('../assets/featuresgifs/wikisearch.gif')"
              alt="Wiki search command"
              class="featureGif elevation-6"
              style="max-width:65%;"
            />
          </v-col>
          <v-col cols="12" sm="6" class="body-2">
            <h2 class="display-1 mb-4">Search Articles</h2>
            <p>
              Truth allows you to search for wiki articles by using
              <code>.wiki search query</code>. This will return the top 10
              results found.
            </p>
            <p>
              Be mindful of uppercase letters, as MTA's wiki is case sensitive
            </p>
          </v-col>
        </v-row>
      </v-lazy>
      <v-divider class="my-5" />
      <v-lazy
        :options="{ threshold: 0.6 }"
        min-height="500"
        transition="slide-x-reverse-transition"
      >
        <v-row align="center">
          <v-col cols="12" sm="6" class="body-2">
            <h2 class="display-1 mb-4">Function/Event Examples</h2>
            <p>
              Get function, event and useful function code examples by using
              <code>.wiki example query</code>
            </p>
            <p>
              Due to discord's maximum message limit, it may not be complete.
              For this reason an URL is returned too.
            </p>
          </v-col>
          <v-col cols="12" sm="6">
            <img
              eager
              min-height="500"
              :src="require('../assets/featuresgifs/wikiexample.gif')"
              alt="Wiki example command"
              class="featureGif elevation-6"
              style="min-width:100%;"
            />
          </v-col>
        </v-row>
      </v-lazy>
      <v-divider class="my-5" />
      <v-lazy
        :options="{ threshold: 0.6 }"
        min-height="500"
        transition="slide-x-transition"
      >
        <v-row align="center">
          <v-col cols="12" sm="6" order="2" order-sm="0">
            <v-img
              eager
              min-height="500"
              contain
              width="70%"
              :src="require('../assets/featuresgifs/settings.png')"
            ></v-img>
          </v-col>
          <v-col cols="12" sm="6" class="body-2">
            <h2 class="display-1 mb-4">Bot Settings</h2>
            <p>
              Blacklist channels, disable commands and configure returned fields
              from a wiki query. This is all possible in the
              <router-link to="/dashboard">dashboard</router-link>.
            </p>
            <p class="font-weight-bold">
              To configure guild settings, you need to have
              <span class="primary--text">Manage Guild</span> permissions in
              said guild.
            </p>
          </v-col>
        </v-row>
      </v-lazy>
    </v-container>
  </v-container>
</template>

<script>
import { VueTyper } from "vue-typer";
import ICountUp from "vue-countup-v2";
export default {
  name: "home",
  components: {
    VueTyper,
    ICountUp
  },
  mounted() {
    this.fetchAppInfo();
  },
  methods: {
    async fetchAppInfo() {
      try {
        const res = await this.$axios.get("application");
        if (!res || !res.data) return;
        this.servedGuilds = res.data.guilds;
        this.inviteUrl = res.data.invite;
      } catch {
        return;
      }
    },
    startCountUp() {}
  },
  data() {
    return {
      inviteUrl: false,
      servedGuilds: 0,
      typerText: [
        ".wiki help",
        ".wiki outputChatBox",
        ".wiki search Element",
        ".wiki example dxDrawText",
        ".wiki Debugging",
        "`onResourceStart`"
      ]
    };
  }
};
</script>
<style>
/* Typer styling */
.vue-typer {
  font-weight: 300;
}
.vue-typer .custom.char.typed {
  color: white;
}
.vue-typer .custom.char.selected {
  color: white;
}

.vue-typer .custom.caret.typing {
  background-color: white;
}
.vue-typer .custom.caret.selecting {
  display: inline-block;
  background-color: #e91e63;
}
.vue-typer .custom.char.selected {
  background: #0d6ad8;
}
/* Feature GIF */
.featureGif {
  max-width: 80%;
}
/* Codeblock background */
code {
  background-color: #212121 !important;
}
</style>
