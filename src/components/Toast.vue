<template>
  <div class="toast-wrapper">
    <div class="toast" :class="notificationTypeClass">
      {{ notification.text }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  mounted() {
    setTimeout(() => this.$store.dispatch('RemoveNotification'), 3000);
  },
  beforeUnmount() {
    clearTimeout();
  },
  computed: {
    ...mapState(['notification']),
    notificationTypeClass() {
      return `${this.notification.type}`;
    },
  },
};
</script>

<style scoped>
.toast-wrapper {
  position: fixed;
  width: 100%;
  bottom: 20px;
  z-index: 100;
}
.toast {
  padding: 20px;
  color: white;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}

.success {
  background: linear-gradient(135deg, rgb(17, 184, 103) 60%, cyan);
}
.sign-out {
  background: linear-gradient(135deg, rgb(32, 109, 114) 60%, rgb(187, 226, 10));
}
.pending {
  background: blue;
}
</style>
