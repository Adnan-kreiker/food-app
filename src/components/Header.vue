<template>
  <div id="nav">
    <router-link v-if="!userLoggedIn" to="/">Login |</router-link>
    <router-link v-if="!userLoggedIn" to="/register">Register |</router-link>
    <router-link v-if="userLoggedIn" @click.prevent="signout" exact-active-class="no class"
      :to="{ name: 'RecipesList'}">Signout |</router-link>
    <router-link :to="{ name: 'RecipesList'}">Recipes List |</router-link>
    <router-link v-if="userLoggedIn"
     :to="{ name: 'CreateRecipe'}">Create a New Recipe |</router-link>
    <a v-if="userLoggedIn"
      exact-active-class="no class">Hi there {{ user_name }}</a>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import { auth } from '../includes/firebase';

export default {
  data() {
    return {
      user_name: '',
    };
  },
  name: 'Header',
  mounted() {
    const user = auth.currentUser;
    this.user_name = user.displayName;
    console.log(this.user_name);
  },
  methods: {
    signout() {
      this.$store.dispatch('signout');
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'RecipesList' });
      }
    },
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },

};
</script>

<style scoped>

</style>
