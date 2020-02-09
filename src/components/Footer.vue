<template>
  <div>
    <v-footer dark padless>
      <v-card
        flat
        tile
        color="secondary"
        width="100%"
        class="white--text text-center"
      >
        <v-container fluid class="restrictWidth">
          <v-row>
            <v-col cols="12" sm="4">
              <h3 class="title">Multi Theft Auto</h3>
              <p class="caption grey--text">
                Truth is an unofficial discord bot for Multi Theft Auto's wiki
                by community member
                <a
                  href="https://forum.mtasa.com/profile/44273-afusensi/"
                  target="_blank"
                >
                  AfuSensi
                </a>
              </p>

              <v-btn
                class="mr-3"
                href="https://mtasa.com/"
                small
                target="_blank"
              >
                Visit MTA.com
              </v-btn>
              <v-btn
                small
                color="primary"
                href="https://mtasa.com/discord"
                target="_blank"
              >
                Join MTA Discord
              </v-btn>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="title">Open Source</h3>
              <p class="caption grey--text">
                This bot is open source. Feel free to contribute and don't
                forget to star this project
              </p>

              <gh-btns-star
                slug="AfuSensi/truth-mta-wiki-bot"
                show-count
              ></gh-btns-star>

              <gh-btns-follow user="AfuSensi" show-count></gh-btns-follow>
            </v-col>
            <v-col cols="12" sm="4">
              <h3 class="title">Report Bugs</h3>
              <p class="caption grey--text">
                If you encounter any bugs while using Truth, please report them
                so it can be fixed.
                <strong>
                  To report a bug, you need to have a github account.
                </strong>
              </p>

              <v-btn
                small
                target="_blank"
                href="https://github.com/AfuSensi/truth-mta-wiki-bot/issues/new"
              >
                Report Bug
              </v-btn>
            </v-col>

            <v-col cols="12" class="py-5 caption">
              {{ new Date().getFullYear() }} —
              <strong>Truth - MTA:SA Wiki Bot</strong>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {},
  methods: {},
  watch: {},
  data: () => ({})
};
</script>

<style>
.gh-button-container {
  display: inline-flex !important;
  float: none !important;
}
.gh-button-container a {
  color: black !important;
}
</style>
