<template>
  <main v-if="recipe.coverUrl">
    <div class="recipe-details">
      <div class="cover grid-pic ">
        <img :src="recipe.coverUrl" />
      </div>
      <div class="recipe-info gird-details">
        <h2 class="recipe-name">{{ recipe.name }}</h2>
        <p v-if="!edit" class="name">by {{ recipe.userName }}</p>
        <p v-if="!edit" class="description">
          <strong> Description: </strong> <br />
          {{ recipe.description }}
        </p>
        <div v-if="edit">
          <label>Edit the name of your recipe</label>
          <input type="text" v-model="modified_name" />
          <label>Edit the description</label>
          <textarea v-model="modified_description" cols="30" rows="10"></textarea>
        </div>
      </div>

      <div class="btn-section">
        <AppButton v-if="ownership & !edit" :color="'red'" :text="'Delete'" @click="handleDelete" />
        <AppButton v-if="ownership & !edit" :color="'gray'" :text="'Edit'" @click="edit = true" />
        <AppButton v-if="edit" :color="'red'" :text="'Cancel'" @click="edit = false" />
        <AppButton
          v-if="edit"
          @click.prevent="handleEdit"
          :text="'Submit'"
          :color="'rgb(17, 184, 103)'"
        />
      </div>
    </div>
  </main>
</template>

<script>
import AppButton from '@/components/AppButton.vue';
import { recipesCollection, auth, storage } from '../includes/firebase';

export default {
  components: {
    AppButton,
  },
  props: ['id'],
  data() {
    return {
      edit: false,
      recipe: {},
      modified_name: '',
      modified_description: '',
      user: '',
    };
  },
  created() {
    const documentRef = recipesCollection.doc(this.$route.params.id);
    documentRef.onSnapshot(
      (doc) => {
        if (doc.data()) {
          this.recipe = { ...doc.data(), id: doc.id };
          this.modified_description = doc.data().description;
          this.modified_name = doc.data().name;
        }
      },
      (err) => {
        console.log(err.message);
        this.recipe = null;
      },
    );
  },
  mounted() {
    this.user = auth.currentUser;
  },
  computed: {
    ownership() {
      return this.recipe && this.user && this.user.uid === this.recipe.userId;
    },
  },
  methods: {
    async handleDelete() {
      const storageRef = storage.ref();
      const recipeRef = storageRef.child(`recipes/${this.user.uid}/${this.recipe.picture_name}`);

      await recipeRef.delete();
      await recipesCollection.doc(this.$route.params.id).delete();
      this.$router.push({ name: 'RecipesList' });
    },
    handleEdit() {
      if (!this.modified_name) {
        this.modified_name = this.recipe.name;
      }
      if (!this.modified_description) {
        this.modified_description = this.recipe.description;
      }
      recipesCollection
        .doc(this.$route.params.id)
        .update({
          name: this.modified_name,
          description: this.modified_description,
        })
        .then(() => {
          console.log('Document successfully written!');
          this.modified_name = '';
          this.modified_description = '';
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: inherit;
  transition-property: all;
  transition-duration: 0.6s;
  transition-timing-function: ease;
}

.recipe-details {
  display: grid;
  grid-gap: 30px;
  grid-template-columns: 40% 58%;
  grid-template-areas:
    'pic details'
    'pic details'
    '. btn-section';
  padding: 20px;
  background: white;
  transition: all ease 0.2s;
  margin: 20px 40px;
}
.recipe-name {
  border-bottom: 1px solid rgb(17, 184, 103);
}
.grid-pic {
  grid-area: pic;
}
.grid-details {
  grid-area: 'details';
}
img {
  width: 100%;
  height: 100%;
  max-height: 450px;
  box-shadow: 1px 3px 4px rgba(50, 50, 50, 0.5);
}
img:hover {
  box-shadow: 1px 6px 48px rgba(50, 50, 50, 0.05);
  transform: scale(1.02);
  transition: all ease 0.3s;
}
.recipe-info {
  line-height: 40px;
  padding: 20px;
  border: 1px solid rgb(17, 184, 103);
  box-shadow: 1px 2px 3px rgba(50, 50, 50, 0.5);
}

i,
h2 {
  display: inline-block;
}

i {
  cursor: pointer;
  margin: 3px;
  padding: 10px;
}
label {
  display: block;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 1px;
}
input {
  padding: 10px;
  border: 0;
  border: 2px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}
textarea {
  border: 1px solid #ddd;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  height: 100px;
}
</style>
