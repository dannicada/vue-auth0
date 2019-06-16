<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>auth0 with vue/vuetify</span>
        
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" clas="mr-2">Home</v-btn>
      <v-btn to="/about" clas="mr-2">About</v-btn>
      <v-btn to="/contact" clas="mr-2">Contact</v-btn>
      <v-btn to="/members" clas="mr-2">Members</v-btn>
      <v-btn @click="logout" v-if="this.$store.state.userIsAuthorized">logout</v-btn>
    </v-toolbar>

    <v-content>
    {{clientId}}
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      clientId: process.env.VUE_APP_AUTH0_CONFIG_CLIENTID
    }
  },
  methods: {
    logout(){
      console.log('logging out')
    }
  },
  beforeCreate() {
    
  }
}
</script>
