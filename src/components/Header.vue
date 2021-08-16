<template>
<header>
  <div id="nav">
    <router-link :to="{ name: 'RecipesList'}">Food<span>Hub</span></router-link>
    <router-link v-if="!userLoggedIn" to="/login">Login</router-link>
    <router-link v-if="!userLoggedIn" to="/register">Register</router-link>
    <router-link v-if="userLoggedIn"
     :to="{ name: 'CreateRecipe'}">Create a New Recipe</router-link>
    <a v-if="userName"
      exact-active-class="no class">Hi there {{ userName }}</a>
    <router-link v-if="userLoggedIn" class="sign-out"
     @click.prevent="signout" exact-active-class="no class"
      :to="{ name: 'RecipesList'}">Signout</router-link>
  </div>
</header>

</template>

<script>
import { mapState } from 'vuex';
// import { auth } from '../includes/firebase';

export default {
  data() {
    return {
      user_name: '',
    };
  },
  name: 'Header',
  // updated() {
  //   const user = auth.currentUser;
  //   this.user_name = user.displayName;
  //   console.log(this.user_name);
  // },
  methods: {
    signout() {
      this.$store.dispatch('signout');
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: 'RecipesList' });
      }
    },
  },
  computed: {
    ...mapState(['userLoggedIn', 'userName']),
  },

};
</script>

<style scoped>
.sign-out{
  float: right;
}
header {
    background: linear-gradient(135deg, rgb(17,184,103) 60%, cyan);
}
#nav {
  padding: 30px;
  text-decoration: none;
}

#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
  border-bottom: none;
  margin: 0px 4px;
  font-size: 1.3rem;
  margin-right: 20px;
}

#nav a.router-link-exact-active {
  /* color: rgb(252,183,138); */
  color: yellow;
}
span {
  background: rgb(17, 184, 103) !important;
  border-radius: 20px;
  color: white;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);

}
</style>
