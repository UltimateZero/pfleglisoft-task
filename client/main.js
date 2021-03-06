import { Meteor } from 'meteor/meteor'
import { Vue } from 'meteor/akryum:vue'

import AppComponent from '/imports/ui/App.vue'

import routerFactory from '/client/configs/router.config'
import '/client/configs/vuetify.config'

Meteor.startup(() => {
  const router = routerFactory.create()

  new Vue({
    router,
    render: h => h(AppComponent)
  }).$mount('app')
})
