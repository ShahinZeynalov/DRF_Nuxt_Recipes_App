<template>
  <div>
    <h2 class="text-center">Login</h2>
    <hr />
    <b-alert v-if="errorMessage" show variant="danger">
      {{ errorMessage }}
    </b-alert>
    <b-alert v-if="redirect" show>
      You have to login before accessing to
      <strong>{{ redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4">
      <b-col md="4">
        <b-card bg-variant="light">
          <!-- <busy-overlay /> -->
          <form @keydown.enter="login">
            <b-form-group label="Email">
              <b-input
                ref="email"
                v-model="formEmail"
                placeholder="email"
              />
            </b-form-group>

            <b-form-group label="Password">
              <b-input v-model="formPassword" type="password" placeholder="123" />
            </b-form-group>

            <div class="text-center">
              <b-btn variant="primary" block @click="login"> Login </b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
      <b-col md="1" align-self="center">
        <div class="text-center">
          <b-badge pill> OR </b-badge>
        </div>
      </b-col>
      <b-col md="4" class="text-center">
        <b-card title="Social Login" bg-variant="light">
          <div v-for="s in strategies" :key="s.key" class="mb-2">
            <b-btn
              block
              :style="{ background: s.color }"
              class="login-button"
              @click="$auth.loginWith(s.key)"
            >
              Login with {{ s.name }}
            </b-btn>
          </div>
          <div class="mb-2">
            <b-btn
              block
              :style="{ background: 'purple' }"
              class="login-button"
              @click="$auth.loginWith('oauth2mock')"
            >
              Login with oauth2
            </b-btn>
          </div>
          {{ authData }}data

        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import busyOverlay from '~/components/busy-overlay'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  // components: { busyOverlay },
  middleware: ['notAuth'],
  data() {
    return {
      formEmail: 'user@example.com',
      formPassword: 'string',
      formError: null
    }
  },
  computed: {
    ...mapState({
      authData: state => state.auth.authUser
    }),
    strategies: () => [
      { key: 'auth0', name: 'Auth0', color: '#ec5425' },
      { key: 'google', name: 'Google', color: '#4284f4' },
      { key: 'facebook', name: 'Facebook', color: '#3c65c4' },
      { key: 'github', name: 'GitHub', color: '#202326' }
    ],
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    },
    errorMessage() {
      const { error } = this
      if (!error || typeof error === 'string') {
        return error
      }
      let msg = ''
      if (error.message) {
        msg += error.message
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, '')
          .replace(/:/g, ': ')
          .replace(/,/g, ' ')})`
      }
      return msg
    }
  },
  methods: {
    // async login() {
    //   this.error = null
    //   return this.$auth
    //     .loginWith('local', {
    //       data: {
    //         email: this.email,
    //         password: this.password
    //       }
    //     })
    //     .catch((e) => {
    //       this.error = e.response.data.non_field_errors[0]
    //       console.log(this.error);
    //     })
    // },
    ...mapActions({
      loginAction: 'auth/login',
    }),
    async login() {
      console.log('logged in begins');
      try {
        await this.$store.dispatch('auth/login', {
          email: this.formEmail,
          password: this.formPassword
        })
        this.formUsername = ''
        this.formPassword = ''
        this.formError = null
        this.$router.push('recipes')
      } catch (e) {
        console.log('login error', e.message);
        this.formError = e.message
      }
    },
    async localRefresh() {
      this.error = null
      return this.$auth
        .loginWith('localRefresh', {
          data: {
            email: this.email,
            password: this.password
          }
        })
        .catch((e) => {
          this.error = e.response.data
        })
    }
  }
}
</script>

<style scoped>
.login-button {
  border: 0;
}
</style>