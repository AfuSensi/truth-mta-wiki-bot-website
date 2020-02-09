<template>
  <v-container fluid class="restrictWidth">
    <v-row>
      <v-col>
        <h1 class="display-1">Commands</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-expansion-panels multiple>
          <v-expansion-panel v-for="command in commands" :key="command.title">
            <v-expansion-panel-header>
              {{ command.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12">
                  <h3>Syntax</h3>
                  <div
                    class="mb-1"
                    v-for="(syntax, i) in command.syntax"
                    :key="i"
                  >
                    <code>
                      {{ syntax }}
                    </code>
                  </div>
                </v-col>
                <v-col cols="12">
                  <h3>Example</h3>
                  <code>{{ command.example }}</code>
                </v-col>

                <v-col cols="12">
                  <h3>Description</h3>
                  <v-row>
                    <v-col cols="12" v-html="command.content"> </v-col>
                    <v-col cols="12">
                      <v-img
                        max-width="70%"
                        min-height="500"
                        contain
                        :src="command.image"
                      ></v-img>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "commands",
  computed: {},
  mounted() {},
  methods: {},
  components: {},
  data() {
    return {
      commands: [
        {
          title: ".wiki get | Fetch wiki article",
          syntax: [".wiki query", "`query`", ".wiki get query"],
          example: ".wiki outputDebugString",
          content: `Both commands fetch wiki articles.`,
          image: require("../assets/featuresgifs/fetch.png")
        },
        {
          title: ".wiki example | Fetch example",
          syntax: [".wiki example query"],
          example: ".wiki example addEventHandler",
          content: `Get the example code for functions and events`,
          image: require("../assets/featuresgifs/example.png")
        },
        {
          title: ".wiki search | Search articles",
          syntax: [".wiki search query"],
          example: ".wiki search Event",
          content: `Search through MTA's wiki`,
          image: require("../assets/featuresgifs/search.png")
        }
      ]
    };
  }
};
</script>
<style></style>
