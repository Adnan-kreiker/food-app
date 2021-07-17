<template>
  <vee-form :validation-schema="schema"
  @submit="register">
    <div >
      <label>Name</label>
      <vee-field type="text" name="name"
        placeholder="Enter Name" />
        <ErrorMessage class="error" name="name"/>
    </div>
    <div>
      <label>Email</label>
      <vee-field type="email" name="email"
        placeholder="Enter Email" />
      <ErrorMessage class="error" name="email" />
    </div>
    <div >
      <label >Password</label>
      <vee-field name="password" :bails="false" v-slot="{ field, errors }">
        <input  type="password"
          placeholder="Password" v-bind="field">
          <div v-for="error in errors" :key="error">
            <p class="error"> {{ error }}</p>
          </div>
      </vee-field>
    </div>
    <div>
      <label >Confirm Password</label>
      <vee-field type="password" name="confirm_password"
        placeholder="Confirm Password" />
      <ErrorMessage class="error" name="confirm_password" />
    </div>
    <button v-if="!reg_in_submission" type="submit">Submit</button>
    <button v-else class="pending">Registering</button>
    <div id="alert" v-if="reg_show_alert" :style="{ 'background-color': background_color}">
      <p>{{ reg_alert_msg }}</p>
      </div>
  </vee-form>
</template>

<script>
export default {
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
      this.$router.push({ name: 'RecipesList' });
    },
  },
};
</script>

<style >

</style>
