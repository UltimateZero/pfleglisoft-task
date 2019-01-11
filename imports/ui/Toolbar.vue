<template>
  <v-toolbar color="primary"
             app>
    <v-toolbar-title>
      <v-btn flat
             class="white--text"
             to="/"
             active-class="">Dashboard</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat
             class="white--text"
             to="/review/random">Random review page</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
export default {
  data() {
    return {
      activeTab: null
    };
  },
  computed: {},
  methods: {}
};
</script>

