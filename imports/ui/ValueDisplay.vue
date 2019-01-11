<template>
  <v-layout class="container text-xs-center"
            column
            align-center>
    <v-flex><img src="http://bla" /></v-flex>
    <v-flex class="primary--text font-weight-bold title">
      <slot name="percentage"></slot>
    </v-flex>
    <v-flex class="primary--text body-2">
      <slot name="title"></slot>
    </v-flex>
    <v-flex>
      <div class="caption">
        <slot name="sub1"></slot>
      </div>
      <div class="caption">
        <slot name="sub2"></slot>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.container > * {
  padding-top: 10px;
}
</style>



