<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.email}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{token}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.full_name}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <!-- <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser () {
      return this.$store.state.user
    },
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    },
    token () {
      return this.$store.state.auth.token
    }
  },
  mounted () {
    console.log(this.loggedIn)
    if (!this.loggedIn) {
      this.$router.push('/login')
    }
    console.log(this.currentUser)
    if (!this.currentUser.full_name) {
      this.$store.dispatch('user/me').then(
        () => {
          this.$router.push('/profile')
        },
        error => {
          this.loading = false
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        }
      )
    }
  }
}
</script>
