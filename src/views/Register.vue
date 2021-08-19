<template>
  <vee-form :validation-schema="schema" @submit="register">
    <div>
      <label>Name</label>
      <vee-field type="text" name="name" placeholder="Enter Name" />
      <ErrorMessage class="error" name="name" />
    </div>
    <div>
      <label>Email</label>
      <vee-field type="email" name="email" placeholder="Enter Email" />
      <ErrorMessage class="error" name="email" />
    </div>
    <div>
      <label>Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input type="password" placeholder="Password" v-bind="field" />
        <div v-for="error in errors" :key="error">
          <p class="error">{{ error }}</p>
        </div>
      </vee-field>
    </div>
    <div>
      <label>Confirm Password</label>
      <vee-field type="password" name="confirm_password" placeholder="Confirm Password" />
      <ErrorMessage class="error" name="confirm_password" />
    </div>
    <AppButton
      class="reg-btn"
      v-if="!reg_in_submission"
      :color="'rgb(17, 184, 103)'"
      :text="'Submit'"
    />
    <button v-else class="pending">Registering</button>
    <div id="alert" v-if="reg_show_alert" :style="{ 'background-color': background_color }">
      <p>{{ reg_alert_msg }}</p>
    </div>
  </vee-form>
</template>

<script>
import AppButton from '@/components/AppButton.vue';

export default {
  components: {
    AppButton,
  },
  name: 'Register',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      background_color: 'blue',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.background_color = 'blue';
      this.reg_alert_msg = 'Please wait! Your account is being created.';
      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.reg_in_submission = false;
        this.background_color = 'red';
        this.reg_alert_msg = 'An unexpected error occured. Please try again later.';
        return;
      }
      this.reg_in_submission = false;
      this.background_color = 'rgb(77, 218, 77)';
      this.reg_alert_msg = 'Success! Your account has been created.';
      this.$router.push({ name: 'HeroSection' });
    },
  },
};
</script>

<style scoped>
form {
  margin-top: 30px;
}
.reg-btn {
  margin: 0px;
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
form {
  max-width: 400px;
  margin: 30px auto;
  padding: 10px 30px 30px 30px;
  border-radius: 8px;
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.5);
  border: 2px solid var(--secondary);
  background: white;
}
</style>
