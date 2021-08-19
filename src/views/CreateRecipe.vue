<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create a New Recipe</h4>
    <label>Recipe</label>
    <input type="text" required placeholder="recipe's name" v-model="name" />
    <label>Description</label>
    <textarea required placeholder="recipe's description" v-model="description"></textarea>
    <label>Upload an image for your recipe</label>
    <input type="file" @change="handleChange($event)" />
    <div class="error">{{ file_error }}</div>
    <button v-if="!reg_in_submission">Create</button>
    <button v-else class="pending">Uploading</button>
    <div id="alert" v-if="reg_show_alert" :style="{ 'background-color': background_color }">
      <p>{{ reg_alert_msg }}</p>
    </div>
  </form>
</template>

<script>
import { auth, db, storage } from '../includes/firebase';

export default {
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
      background_color: 'blue',
      reg_alert_msg: 'Please wait! the image is being uploaded.',
    };
  },
  methods: {
    async handleSubmit() {
      if (this.file) {
        this.reg_show_alert = true;
        this.reg_in_submission = true;
        this.background_color = 'blue';
        this.reg_alert_msg = 'Please wait! the file is being uploaded.';
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
        } catch (err) {
          this.error = err.message;
          this.reg_in_submission = false;
          this.background_color = 'red';
          this.reg_alert_msg = 'An unexpected error occured. Please try again later.';
          return;
        }
        this.reg_in_submission = false;
        this.background_color = 'rgb(77, 218, 77)';
        this.reg_alert_msg = 'Success! Your filed has been loaded.';
        this.name = '';
        this.description = '';
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
#alert p {
  color: white;
  height: 30;
  border-radius: 20px;
  text-align-last: center;
  vertical-align: middle;
  margin: 10px;
  padding: 20px;
}
</style>
