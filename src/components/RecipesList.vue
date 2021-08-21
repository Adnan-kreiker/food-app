<template>
  <div class="wrapper">
    <h1
      id="recipe"
      class="recipe-text animate__animated
     animate__pulse animate__repeat-2 "
    >
      Our Hottest Recipes
    </h1>
    <div class="recipes">
      <recipe-card v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
</template>

<script>
import { db } from '../includes/firebase';
import RecipeCard from './RecipeCard.vue';

export default {
  data() {
    return {
      recipes: [],
      error: null,
    };
  },
  unmounted() {
    console.log('unmounted');
  },
  components: {
    RecipeCard,
  },
  created() {
    db.collection('recipes')
      .get()
      .then(
        (snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.recipes.push({ ...doc.data(), id: doc.id });
          });
          this.documents = this.recipes;
          this.error = null;
        },
        (err) => {
          console.log(err.message);
          this.documents = null;
          this.error = 'could not fetch data';
        },
      );
  },
};
</script>

<style scoped>
.recipes {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
h1 {
  font-style: normal;
  font-weight: bold;
  color: #eee;
  font-size: 11vmin;
  letter-spacing: 0.03em;
  line-height: 1;
  /* text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.8); */
  margin-bottom: 37px;
}
.recipe-text {
  color: #35495e;
  margin-left: 30px;
  padding-top: 30px;
}
.wrapper {
  /* background: linear-gradient(135deg, #f5f5f5 30%, rgba(17, 184, 103, 0.5)); */
  background: white;
}
</style>
