<template>
  <div>
    <v-row>
      <v-col cols="10">
        <h1 class="display-1 mb-3">Dashboard - Guild Settings</h1>
        <h3 v-if="fetched">{{ guildName }} - {{ guildID }}</h3>
        <h3 v-else>...</h3>
      </v-col>
      <v-col cols="2" class="text-right">
        <v-btn color="primary" @click="$router.push('/dashboard')">Back</v-btn>
      </v-col>
    </v-row>
    <div v-if="!fetched">
      <v-skeleton-loader
        v-for="(n, index) in 10"
        :key="index"
        type="list-item-two-line"
      />
    </div>
    <v-card>
      <v-row v-if="fetched">
        <v-col cols="12">
          <div class="ma-3">
            <h3>General Settings</h3>
            <p class="caption">
              General guild bot settings
            </p>
          </div>
          <v-list flat two-line>
            <v-list-item
              v-for="(value, name) in changedGeneralSettings"
              :key="name"
              @click="
                changedGeneralSettings[name] = !changedGeneralSettings[name]
              "
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="changedGeneralSettings[name]"
                  @click="
                    changedGeneralSettings[name] = !changedGeneralSettings[name]
                  "
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{ generalDescriptions[name].name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ generalDescriptions[name].description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider class="my-5"></v-divider>

          <div class="ma-3">
            <h3>Embed Settings</h3>
            <p class="caption">
              Control the rich embed fields returned from a wiki command
            </p>
          </div>
          <v-list flat two-line>
            <v-list-item
              v-for="(value, name) in changedEmbedSettings"
              :key="name"
              @click="changedEmbedSettings[name] = !changedEmbedSettings[name]"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="changedEmbedSettings[name]"
                  @click="
                    changedEmbedSettings[name] = !changedEmbedSettings[name]
                  "
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>
                  {{ embedDescriptions[name].name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ embedDescriptions[name].description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider class="my-5"></v-divider>

          <div class="ma-3">
            <h3>Channel Blacklist</h3>
            <p class="caption">
              Channels that are <b>selected</b> will be <b>ignored</b> by this
              bot
            </p>
          </div>

          <v-expansion-panels focusable multiple>
            <v-expansion-panel
              v-for="category in fetched.blacklistSettings"
              :key="category.name"
            >
              <v-expansion-panel-header>
                Category: {{ category.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-checkbox
                  @change="toggleAllChannelsCategory($event, category.name)"
                  label="Blacklist whole category"
                ></v-checkbox>
                <v-list subheader dense>
                  <v-list-item-group
                    v-model="changedChannelSettings"
                    multiple
                    active-class=""
                  >
                    <v-list-item
                      v-for="channel in category.channels"
                      :key="channel.id"
                      :value="channel.id"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-action>
                          <v-checkbox v-model="active"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                          <v-list-item-title
                            >#{{ channel.name }}</v-list-item-title
                          >
                          <v-list-item-subtitle>
                            {{ channel.id }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-card>
    <div style="height:170px;"></div>
    <!-- Save/reset snackbar -->

    <v-snackbar :timeout="0" multi-line :value="settingsDidChange">
      Settings have changed

      <v-btn text color="warning" @click="resetSettings()">
        Reset
      </v-btn>
      <v-btn text color="primary" @click="saveSettings()">
        Save
      </v-btn>
    </v-snackbar>
    <!-- Save Overlay -->
    <v-overlay :value="isSaving" :z-index="2000">
      <v-container fluid fill-height class="text-center">
        <v-row>
          <v-col cols="12">
            <h1 class="mb-5 display-3	">Saving...</h1>
          </v-col>
          <v-col cols="12">
            <v-progress-circular
              color="primary"
              indeterminate
              width="10"
              size="90"
            ></v-progress-circular>
          </v-col>
        </v-row>
      </v-container>
    </v-overlay>
    <!-- Save Success/error -->
    <v-snackbar v-model="showSaveError" color="error">
      An error has occcured while saving. Please try again.
    </v-snackbar>
    <v-snackbar v-model="showSaveSuccess" color="primary">
      Successfully saved new guild settings!
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "GuildSettings",
  computed: {
    ...mapState(["accessToken"]),
    settingsDidChange: function() {
      return (
        this.embedSettingsDidChange ||
        this.channelSettingsDidChange ||
        this.generalSettingsDidChange
      );
    }
  },
  mounted() {
    this.fetchGuildSettings();
  },
  watch: {
    changedChannelSettings: function() {
      this.checkChannelSettingsChanged();
    },
    changedEmbedSettings: {
      handler() {
        this.checkEmbedSettingsChanged();
      },
      deep: true
    },
    changedGeneralSettings: {
      handler() {
        this.checkGeneralSettingsChanged();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(["fetchDashboardList"]),
    toggleAllChannelsCategory(add, category) {
      for (const cat of this.fetched.blacklistSettings) {
        if (cat.name === category) {
          for (const chan of cat.channels) {
            const id = chan.id;
            if (add) {
              if (!this.changedChannelSettings.includes(id)) {
                this.changedChannelSettings.push(id);
              }
            } else {
              this.changedChannelSettings = this.changedChannelSettings.filter(
                e => e !== id
              );
            }
          }
          break;
        }
      }
    },
    async fetchGuildSettings() {
      try {
        const res = await this.$axios.get(
          `dashboard/settings/${this.$route.params.id}`,
          {
            headers: {
              Authorization: this.accessToken,
              "Content-Type": "application/json",
              accept: "application/json"
            }
          }
        );
        // eslint-disable-next-line no-console
        // console.log(res.data);

        // Set channel settings defaults
        const channelSettings = [];
        for (const r of res.data.blacklistSettings) {
          for (const chan of r.channels) {
            if (chan.isBlacklisted) {
              channelSettings.push(chan.id);
            }
          }
        }
        this.guildName = res.data.name;
        this.guildID = res.data.id;

        this.initialEmbedSettings = { ...res.data.embedSettings };
        this.changedEmbedSettings = { ...res.data.embedSettings };

        this.initialChannelSettings = [...channelSettings];
        this.changedChannelSettings = [...channelSettings];

        this.initialGeneralSettings = { ...res.data.generalSettings };
        this.changedGeneralSettings = { ...res.data.generalSettings };

        this.fetched = res.data;
        this.channelSettingsDidChange = false;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },
    resetSettings() {
      this.changedEmbedSettings = { ...this.initialEmbedSettings };
      this.changedChannelSettings = [...this.initialChannelSettings];
      this.changedGeneralSettings = { ...this.initialGeneralSettings };
    },
    checkChannelSettingsChanged() {
      if (
        this.initialChannelSettings.length !==
        this.changedChannelSettings.length
      ) {
        this.channelSettingsDidChange = true;
        return;
      }

      this.channelSettingsDidChange = !this.initialChannelSettings.every(e =>
        this.changedChannelSettings.includes(e)
      );
      return;
    },

    checkGeneralSettingsChanged() {
      for (const k in this.initialGeneralSettings) {
        if (this.initialGeneralSettings[k] !== this.changedGeneralSettings[k]) {
          // Changed
          this.generalSettingsDidChange = true;
          return;
        }
      }
      this.generalSettingsDidChange = false;
    },

    checkEmbedSettingsChanged() {
      for (const k in this.initialEmbedSettings) {
        if (this.initialEmbedSettings[k] !== this.changedEmbedSettings[k]) {
          // Changed
          this.embedSettingsDidChange = true;
          return;
        }
      }
      this.embedSettingsDidChange = false;
    },
    async saveSettings() {
      if (
        !this.embedSettingsDidChange &&
        !this.channelSettingsDidChange &&
        !this.generalSettingsDidChange
      ) {
        return;
      }
      this.isSaving = true;
      try {
        const res = await this.$axios.post(
          `dashboard/settings/${this.$route.params.id}`,
          {
            id: this.guildID,
            channelBlacklistSettings: this.channelSettingsDidChange
              ? this.changedChannelSettings
              : false,
            embedSettings: this.embedSettingsDidChange
              ? this.changedEmbedSettings
              : false,
            generalSettings: this.generalSettingsDidChange
              ? this.changedGeneralSettings
              : false
          },
          {
            headers: {
              Authorization: this.accessToken,
              "Content-Type": "application/json",
              accept: "application/json"
            }
          }
        );
        if (!res.data.ok) {
          throw new Error("Response not OK");
        }
        await this.fetchGuildSettings();
        this.isSaving = false;
        this.showSaveSuccess = true;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        this.isSaving = false;
        this.showSaveError = true;
      }
    }
  },
  components: {},
  data() {
    return {
      fetched: false,
      guildName: "",
      guildID: false,
      initialEmbedSettings: [],
      changedEmbedSettings: [],
      embedSettingsDidChange: false,
      initialChannelSettings: [],
      changedChannelSettings: [],
      channelSettingsDidChange: false,
      initialGeneralSettings: [],
      changedGeneralSettings: [],
      generalSettingsDidChange: false,

      isSaving: false,
      showSaveError: false,
      showSaveSuccess: false,
      // Setting Descriptions
      embedDescriptions: {
        showPageDescription: {
          name: "Show Article Description",
          description: "Shows article description"
        },
        showPageImage: {
          name: "Show Article Image",
          description: "Shows article image (if present)"
        },
        showFunctionSyntax: {
          name: "Show Function Syntax",
          description: "Shows function syntaxes for both client and server"
        },
        showFunctionOOPSyntax: {
          name: "Show OOP Syntax",
          description: "Shows OOP syntax (if present)"
        },
        showFunctionReturnsSection: {
          name: "Show Function Returns",
          description: "Shows returned values of functions"
        },
        showEventParameter: {
          name: "Show Event Parameters",
          description: "Shows event parameters"
        },
        showEventParameterText: {
          name: "Show Event Parameter List",
          description: "Shows the list of parameters"
        },
        showEventSource: {
          name: "Show Event Source",
          description: "Shows event source element"
        },
        showEventCancel: {
          name: "Show Event Cancel Section",
          description: "Shows event cancel section (if present)"
        }
      },
      generalDescriptions: {
        enableGet: {
          name: "Enable .wiki get Command",
          description: "Enable .wiki <query> and .wiki get <query> commands"
        },
        enableBacktick: {
          name: "Enable `query`",
          description: "Enables the backtick command. `outputChatBox`"
        },
        enableExample: {
          name: "Enable .wiki example Command",
          description: "Enables the example fetching command"
        },
        enableSearch: {
          name: "Enable .wiki search Command",
          description: "Enables the wiki search command"
        },
        returnNoResultMessage: {
          name: "Show 'No results' message",
          description: "Show message when a query fails"
        }
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>
<style>
/* .v-expansion-panel:not(.v-expansion-panel-header--active):hover {
  background: #303030 !important;
} */
</style>
