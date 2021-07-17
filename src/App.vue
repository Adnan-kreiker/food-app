<template>
   <app-header />
    <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>
<script>
import { mapState } from 'vuex';
import AppHeader from './components/Header.vue';

export default {
  components: {
    AppHeader,
  },
  created() {
    console.log(this.userLoggedIn);
    this.$store.dispatch('init_login');
    console.log(this.userLoggedIn);
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
#nav {
  padding: 30px;
  text-decoration: none;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  border-bottom: none;
  margin: 0px 4px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
