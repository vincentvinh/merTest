<template>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="user.email"
      :counter="10"
      label="Email"
      required
    ></v-text-field>

 <v-text-field
      v-model="user.password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Normal with hint text"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="handleLogin"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
  </v-form>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      user: {
      // eslint-disable-next-line @typescript-eslint/camelcase
        email: '',
        password: ''
      },
      valid: true,
      checkbox: false,
      isValid: true,
      show1: false,
      password: 'Password',
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },

  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  created () {
    if (this.loggedIn) {
      this.$router.push('/profile')
    }
  },
  methods: {
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    handleLogin () {
      this.loading = true
      if (!this.isValid) {
        this.loading = false
        return
      }
      if (this.user && this.user.email && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
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
  },
  mounted () {
    if (this.loggedIn) {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
