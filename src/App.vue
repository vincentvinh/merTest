<template>
  <div id="app" data-app>
    <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
       <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Dropdown
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="home">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="register">
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
        <v-list-item @click="login">
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    },
    showAdminBoard () {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN')
      }

      return false
    },
    showModeratorBoard () {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR')
      }

      return false
    }
  },
  methods: {
    login () {
      // Perform an action
      this.$router.push({ path: 'login' })
    },
    register () {
      // Perform an action
      this.$router.push({ path: 'register' })
    },
    home () {
      // Perform an action
      this.$router.push({ path: 'home' })
    },
    logOut () {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>
