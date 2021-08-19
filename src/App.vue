<template>
  <app-header />
  <router-view v-slot="{ Component }" :key="$route.fullPath">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <app-footer />
</template>
<script>
import { mapState } from 'vuex';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/Header.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  created() {
    this.$store.dispatch('init_login');
  },
  computed: {
    ...mapState(['userLoggedIn']),
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.45s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
/* .fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
} */
</style>
