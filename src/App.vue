<template>
  <app-header />
  <transition name="toast">
    <toast v-if="notification" />
  </transition>
  <router-view />
  <!-- <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view> -->

  <app-footer />
</template>
<script>
import { mapState } from 'vuex';
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/Header.vue';
import Toast from './components/Toast.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    Toast,
  },
  created() {
    this.$store.dispatch('init_login');
  },
  computed: {
    ...mapState(['userLoggedIn', 'notification']),
  },
  mounted() {
    console.log(this.notification);
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
.toast-enter-from {
  opacity: 0;
  transform: translateY(60px);
}
.toast-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
.toast-enter-active {
  transition: all 1s ease;
}
.toast-leave-from {
  opacity: 1;
  transform: translateY(0px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(60px);
}
.toast-leave-active {
  transition: all 0.3s ease;
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
