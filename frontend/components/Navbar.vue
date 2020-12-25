<template lang="html">
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <nuxt-link to='/' class='navbar-brand'>DealMeal</nuxt-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to='/recipes'>Recipes</b-nav-item>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right v-if='this.$store.state.auth.authUser' >
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{ $store.state.auth.authUser.email }}</em>
            </template>
            
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout()">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item to='/login' v-if='!this.$store.state.auth.authUser' >
            Login
          </b-nav-item>
          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>



</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
