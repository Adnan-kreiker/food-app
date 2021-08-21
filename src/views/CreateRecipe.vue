<template>
  <form :class="{ pending: reg_in_submission }" @submit.prevent="handleSubmit">
    <h4>Create a New Recipe</h4>
    <div>
      <label>Recipe</label>
      <input type="text" required placeholder="Recipe's name" v-model="name" />
    </div>
    <div>
      <label>Description</label>
      <textarea required placeholder="Recipe's description" v-model="description"></textarea>
    </div>
    <div>
      <label>Upload an image for your recipe</label>
      <input type="file" @change="handleChange($event)" />
    </div>
    <div class="error">{{ file_error }}</div>
    <AppButton
      :color="color"
      :text="text"
      :disabled="reg_in_submission"
      :cursor="cursor"
      class="button"
    />
    <div id="alert" v-if="reg_show_alert && reg_alert_msg">
      <p>{{ reg_alert_msg }}</p>
    </div>
  </form>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
import { auth, db, storage } from '../includes/firebase';

export default {
  components: {
    AppButton,
  },
  data() {
    return {
      name: '',
      description: '',
      file: null,
      file_error: null,
      file_types: ['image/png', 'image/jpeg', 'image/jpg'],
      error: null,
      filePath: null,
      url: null,
      reg_in_submission: false,
      reg_show_alert: false,
      text: 'Create recipe',
      color: 'rgb(17, 184, 103)',
      cursor: 'pointer',
    };
  },
  methods: {
    async handleSubmit() {
      if (this.file) {
        this.reg_show_alert = true;
        this.reg_in_submission = true;
        this.color = 'rgb(1,253,250)';
        this.reg_alert_msg = null;
        this.text = 'Please wait!';
        this.cursor = 'wait';
        const user = auth.currentUser;
        this.filePath = `recipes/${user.uid}/${this.file.name}`;
        const storageRef = storage.ref(this.filePath);
        try {
          const res = await storageRef.put(this.file);
          this.url = await res.ref.getDownloadURL();
          await db.collection('recipes').add({
            picture_name: this.file.name,
            name: this.name,
            description: this.description,
            userId: user.uid,
            userName: user.displayName,
            coverUrl: this.url,
            filePath: this.filePath,
          });
        } catch (error) {
          this.reg_in_submission = false;
          this.reg_alert_msg = error.message;
          this.text = 'Try again';
          this.reg_in_submission = false;
          this.color = 'red';
          this.cursor = 'pointer';

          return;
        }
        this.reg_in_submission = false;
        this.color = 'rgb(77,218,77)';
        this.reg_alert_msg = null;
        this.cursor = 'pointer';
        this.name = '';
        this.description = '';
        this.text = 'Create another recipe';
        const notification = {
          type: 'success',
          text: 'Success! Your Recipe has been created.',
        };
        this.$store.dispatch('AddNotification', notification);
      }
    },
    handleChange($event) {
      const selected = $event.target.files[0];
      if (selected && this.file_types.includes(selected.type)) {
        this.file = selected;
        this.file_error = null;
      } else {
        this.file = null;
        this.file_error = 'Please select a valid file type';
      }
    },
  },
};
</script>
<style scoped>
form {
  margin-top: 30px;
}
.pending {
  cursor: wait;
}
h4 {
  padding-top: 20px;
}
#alert p {
  color: red;
  height: 30;
  border-radius: 20px;
  text-align-last: center;
  vertical-align: middle;
  margin: 10px;
  padding: 20px;
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
  box-shadow: 1px 2px 3px rgba(55, 79, 107, 0.5);
  border: 2px solid var(--secondary);
  background: white;
}
.button {
  margin: 0;
}
form > div {
  margin: 10px 0;
}
p {
  height: auto;
}
</style>
