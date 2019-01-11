<template>
  <v-app>
    <toolbar></toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from "/imports/ui/Toolbar.vue";

export default {
  components: {
    Toolbar
  },
  created() {
    // Workaround for changing theme colors: https://github.com/vuetifyjs/vuetify/issues/4452#issuecomment-404279806
    this.$vuetify.theme.primary = "#FA7373";
    this.$vuetify.theme.secondary = "#FFCDD2";
    this.$vuetify.theme.accent = "#3F51B5";
  }
};
</script>

<style lang="stylus">
body
  background-color #212121
  color white
  font-family 'Roboto', sans-serif
</style>