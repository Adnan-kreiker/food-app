<template>
  <main>
    <vee-form :validation-schema="schema" @submit="login">
      <div class="input-container">
        <label>Email</label>
        <vee-field type="email" name="email" placeholder="Enter Email" />
        <ErrorMessage class="error" name="email" />
      </div>
      <div class="input-container">
        <label>Password</label>
        <vee-field type="password" name="password" placeholder="Password" />
        <ErrorMessage class="error" name="password" />
      </div>
      <AppButton
        class="login-btn"
        :color="color"
        :text="text"
        :disabled="reg_in_submission"
        :cursor="cursor"
      />
      <div id="alert" v-if="reg_show_alert">
        <p>{{ reg_alert_msg }}</p>
      </div>
    </vee-form>
  </main>
</template>

<script>
import AppButton from '@/components/AppButton.vue';

export default {
  components: {
    AppButton,
  },
  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required|min:3|max:32',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_msg: '',
      text: 'login',
      color: 'rgb(17, 184, 103)',
      cursor: 'pointer',
    };
  },
  methods: {
    async login(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.color = 'rgb(1,253,250)';
      this.reg_alert_msg = '';
      this.text = 'Please wait!';
      this.cursor = 'wait';
      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        console.log(error.message);
        this.background_color = 'red';
        this.reg_alert_msg = error.message;
        this.text = 'Try again';
        this.reg_in_submission = false;
        this.color = 'red';
        this.cursor = 'pointer';
        return;
      }
      this.reg_in_submission = false;
      this.background_color = 'rgb(77,218,77)';
      this.reg_alert_msg = '';
      this.cursor = 'pointer';

      const login = () => {
        const notification = {
          type: 'success',
          text: 'Success! You logged in successfully.',
        };
        this.$store.dispatch('AddNotification', notification);
      };
      setTimeout(login, 500);

      this.$router.push({ name: 'HeroSection' });
    },
  },
  beforeUnmount() {
    clearTimeout();
  },
};
</script>

<style scoped>
.login-btn {
  margin: 0px;
}
#alert p {
  color: red;
  /* height: 30; */
  border-radius: 20px;
  text-align-last: center;
  vertical-align: middle;
  /* margin: 10px;
  padding: 20px; */
}
#alert {
  border-radius: 20px;
}
.error {
  color: var(--warning);
  font-size: 14px;
  height: 20px;
  position: relative;
}

form > div {
  margin: 20px 0;
}
form > div:nth-child(2) {
  margin-top: 0px;
}
form {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 30px auto;
  padding: 10px 30px 30px 30px;
  border-radius: 8px;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.5);
  border: 2px solid var(--secondary);
  background: white;
}
</style>
