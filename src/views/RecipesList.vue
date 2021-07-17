<template>
<div class="recipes">
  <recipe-card v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
 </div>
</template>

<script>
import { db } from '../includes/firebase';
import RecipeCard from '../components/RecipeCard.vue';

export default {
  data() {
    return {
      recipes: [],
      error: null,
    };
  },
  components: {
    RecipeCard,
  },
  created() {
    db.collection('recipes').get().then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        this.recipes.push({ ...doc.data(), id: doc.id });
      });
      this.documents = this.recipes;
      this.error = null;
    }, (err) => {
      console.log(err.message);
      this.documents = null;
      this.error = 'could not fetch data';
    });
  },
};
</script>

<style>
 .recipes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
