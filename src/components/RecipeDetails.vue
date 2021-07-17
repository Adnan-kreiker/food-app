<template>
<div v-if="recipe" class="recipe-details">
      <div v-if="recipe" class="cover">
        <img :src="recipe.coverUrl">
      </div>
      <div class="recipe-info">
      <h2>{{ recipe.name }}</h2> <br>
      <div v-if="edit">
      <label>Edit the name of your recipe</label>
      <input type="text" v-model="modified_name">
      </div>
      <p class="name">Created by {{ recipe.userName }}</p>
      <p class="description">Description: {{ recipe.description }}</p>
      <div v-if="edit">
       <label>Edit the description</label>
      <textarea v-model="modified_description" cols="30" rows="10"></textarea>
      </div>
     <i v-if="ownership" @click="handleDelete"
      class="far fa-trash-alt btn"> Delete </i>
      <i v-if="ownership" class="far fa-edit btn" @click="edit = true"> Edit</i>
      <i v-if="edit" class="far fa-check-square btn" @click.prevent="handleEdit"> Submit</i>
    </div>
</div>
</template>

<script>
import { recipesCollection, auth, storage } from '../includes/firebase';

export default {
  props: ['id'],
  data() {
    return {
      edit: false,
      recipe: {},
      modified_name: '',
      modified_description: '',
    };
  },
  created() {
    this.user = auth.currentUser;
    console.log(this.user.displayName);
    const documentRef = recipesCollection.doc(this.$route.params.id);
    documentRef.onSnapshot((doc) => {
      if (doc.data()) {
        console.log(doc.data(), doc.id, this.id, this.recipe.id);
        console.log(this.recipe.id);
        this.recipe = { ...doc.data(), id: doc.id };
        console.log(this.recipe);
      }
    }, (err) => {
      console.log(err.message);
      this.recipe = null;
    });
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
      recipesCollection.doc(this.$route.params.id).update({
        name: this.modified_name,
        description: this.modified_description,
      }).then(() => {
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

<style scoped>

.recipe-details {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    justify-content: center;
    padding: 20px;
    border-radius: 20px;
    background: white;
    transition: all ease 0.2s;
}
img {
  border-radius: 30px;
  width: 400px;
  height: 400px;
}
img:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    transition: all ease 0.2s;
}
.recipe-info {
  margin-top: 30px;
  line-height: 40px;
  padding: 20px;

}

i, h2 {
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
