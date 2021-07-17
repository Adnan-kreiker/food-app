<template>
  <vee-form :validation-schema="schema"
    @submit="login">
    <div>
      <label>Email</label>
      <vee-field type="email" name="email"
        placeholder="Enter Email" />
        <ErrorMessage name="email"/>
    </div>
    <div>
      <label>Password</label>
      <vee-field type="password" name="password"
        placeholder="Password" />
        <ErrorMessage name="password"/>
    </div>
    <button v-if="!reg_in_submission" type="submit">Submit</button>
    <button v-else class="pending">Logging in</button>
    <div id="alert" v-if="reg_show_alert" :style="{ 'background-color': background_color}">
      <p>{{ reg_alert_msg }}</p>
      </div>
  </vee-form>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      schema: {
        email: 'required|email',
        password: 'required|min:3|max:32',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      background_color: 'blue',
      reg_alert_msg: 'Please wait! We are logging you in.',
    };
  },
  methods: {
    async login(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.background_color = 'blue';
      this.reg_alert_msg = 'Please wait! We are logging you in.';
      try {
        await this.$store.dispatch('login', values);
      } catch (error) {
        console.log(error.message);
        this.background_color = 'red';
        this.reg_alert_msg = 'An unexpected error occured. Please try again later.';
        return;
      }
      this.reg_in_submission = false;
      this.background_color = 'rgb(77, 218, 77)';
      this.reg_alert_msg = 'Success! You logged in successfully.';
      this.$router.push({ name: 'RecipesList' });
    },
    ...mapState(['userLoggedIn']),
  },
};

</script>

<style>

</style>
