<template>
       <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="user.full_name"
      :counter="10"
      :rules="nameRules"
      label="Full Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

   <v-text-field
      v-model="user.password"
      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="show1 ? 'text' : 'password'"
      name="input-10-1"
      label="Normal with hint text"
      hint="At least 8 characters"
      counter
      @click:append="show1 = !show1"
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="handleRegister"
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
  name: 'Register',
  data: () => ({
    user: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      full_name: '',
      email: '',
      password: ''
    },
    valid: true,
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    show1: false,
    password: 'Password',
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 8 || 'Min 8 characters',
      emailMatch: () => ('The email and password you entered don\'t match')
    },
    checkbox: false,
    isValid: true
  }),

  methods: {
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    handleRegister () {
      this.message = ''
      this.submitted = true
      if (this.isValid) {
        this.$store.dispatch('auth/register', this.user).then(
          data => {
            this.message = data.message
            this.successful = true
            this.$router.push('/login')
          },
          error => {
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString()
            this.successful = false
          }
        )
      }
    }
  },
  computed: {
    loggedIn () {
      return this.$store.state.auth.status.loggedIn
    }
  },
  mounted () {
    if (this.loggedIn) {
      this.$router.push('/profile')
    }
  }
}
</script>

<style scoped>
</style>
