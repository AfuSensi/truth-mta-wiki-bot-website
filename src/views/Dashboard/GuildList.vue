<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="display-1 mb-3">Dashboard</h1>
        <p class="caption">
          Click on a guild to manage settings.<br />
          <b>"Manage guild" permission is required to edit bot settings.</b>
        </p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="dashboardGuildList && dashboardGuildList.length > 0">
        <v-list two-line>
          <v-list-item
            v-for="guild in dashboardGuildList"
            :key="guild.id"
            @click="guildListClick(guild)"
          >
            <v-list-item-avatar size="50px">
              <v-avatar>
                <img v-if="guild.iconURL" :src="guild.iconURL" />
                <v-icon v-else>
                  mdi-image-area
                </v-icon>
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="guild.name"></v-list-item-title>
              <v-list-item-subtitle
                v-text="`ID: ${guild.id}`"
                class="overline"
              ></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn text v-if="guild.botIsInGuild">Configure</v-btn>
              <v-btn
                v-else
                color="primary"
                :href="guild.inviteURL"
                target="_blank"
                >Invite</v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="12" v-if="!dashboardGuildList">
        <v-skeleton-loader
          v-for="(n, index) in 5"
          :key="index"
          type="list-item-avatar-two-line"
        />
      </v-col>
      <v-col
        cols="12"
        v-if="dashboardGuildList && dashboardGuildList.length === 0"
      >
        <v-card color="error">
          <v-card-title>
            No guilds
          </v-card-title>
          <v-card-text>
            You have no guilds available for configuration.
            <b>Make sure you are in a guild with "Manage Guild" permissions.</b>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- Invite dialog -->
    <v-dialog v-model="inviteDialog" persistent max-width="400">
      <v-card raised>
        <v-card-title class="headline">
          Inviting
        </v-card-title>
        <v-card-text>
          Once you have added Truth to your server, please click continue.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="inviteContinue">
            Continue
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "GuildList",
  computed: {
    ...mapState(["dashboardGuildList"])
  },
  mounted() {
    this.fetchDashboardList();
  },
  methods: {
    ...mapActions(["fetchDashboardList"]),
    guildListClick(guild) {
      if (guild.botIsInGuild) {
        this.$router.push(`/dashboard/guild/${guild.id}`);
      } else {
        this.inviteDialog = true;
        window.open(guild.inviteURL, "_blank");
      }
    },
    inviteContinue() {
      //Refresh page when user clicks continue
      this.$router.go();
    }
  },
  components: {},
  data() {
    return {
      inviteDialog: false
    };
  },
  beforeRouteLeave(to, from, next) {
    // Clear dashboardGuildList when leaving route
    this.$store.commit("updateDashboardGuildList", null);
    next();
  }
};
</script>
