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

<style scoped>

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

</style>
