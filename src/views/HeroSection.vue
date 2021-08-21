<template>
  <div>
    <section
      id="main"
      class="masthead animate__animated animate__fadeIn animate__slow"
      role="img"
      aria-label="Image Description"
    >
      <h1>Food<span>Hub</span></h1>
      <p>
        Get inspired by our nutritious flavour-packed recipes, <br />
        add your own delicious recipes and share them with the world.
      </p>
      <router-link :to="{ path: '/', hash: '#recipe' }"
        ><button class="btn1">
          Browse Recipes
        </button></router-link
      >
    </section>
    <section>
      <About />
    </section>
    <section class="add-recipe">
      <div class="add-container">
        <h1>Add Your Recipe Now!</h1>
        <p>Share your grandmother's secret recipe for chicken soup or something...</p>
        <img src="/images/cooking-recipe.png" alt="" />
        <router-link :to="{ name: 'CreateRecipe' }">
          <AddFoodButton :text="'ADD YOUR RECIPE!'" class="recipe-btn" />
        </router-link>
      </div>
    </section>
    <section class="recipe-list" id="recipeSection">
      <RecipesList />
    </section>
  </div>
</template>

<script>
import RecipesList from '@/components/RecipesList.vue';
import About from '@/components/About.vue';
import AddFoodButton from '@/components/AddFoodButton.vue';

export default {
  components: {
    RecipesList,
    About,
    AddFoodButton,
  },
};
</script>

<style lang="scss" scoped>
.masthead {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  text-align: start;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-size: cover !important;
  background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(/images/main-img.jpg) no-repeat center center scroll;
}
.masthead > h1 {
  margin-left: 30px;
  position: absolute;
  top: 40%;
}

.masthead button {
  margin-left: 30px;
  position: absolute;
  top: 70%;
}
.masthead > p {
  // /* background: linear-gradient() rgba(38,38,38, 0.6) !important; */
  background: linear-gradient(100deg, rgba(63, 63, 63, 0.5) 0%, rgba(112, 111, 111, 0.6));
  padding: 5px;
}

h1 {
  font-style: normal;
  font-weight: bold;
  color: #eee;
  font-size: 11vmin;
  letter-spacing: 0.03em;
  line-height: 1;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 37px;
}
p {
  font-style: normal;
  margin-left: 30px;
  font-weight: bold;
  color: #eee;
  font-size: 3.5vmin;
  letter-spacing: 0.03em;
  line-height: 1.2;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 37px;
}

.btn1 {
  background: rgb(17, 184, 103);
  transition: background ease 0.25s;
  border-radius: 19px;
  display: inline-block;
  border: none;
  padding: 0.75rem 1.5rem;
  margin: 0px;
  text-decoration: none;
  color: #ffffff;
  font-size: 1.2rem;
  cursor: pointer;
  text-align: center;
  -webkit-appearance: none;
  -moz-appearance: none;
}
button:hover {
  background: rgb(14, 128, 72);
}
span {
  background: rgb(17, 184, 103) !important;
  border-radius: 20px;
  color: black;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
}
.recipe-text {
  color: rgb(17, 184, 103);
  margin: 30px 0 0 30px;
}
.recipe-list {
  min-height: 100vh;
}
.add-recipe {
  height: 100vh;

  // position: relative;
  background: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0) 60%,
      rgba(0, 0, 0, 0.65) 100%
    ),
    url(/images/add-recipe.webp) no-repeat center center scroll;
}
.add-container {
  display: grid;
  width: 80vw;
  padding: 4vw 0 0 14vw;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'h1 h1'
    'txt img'
    'btn img';
  justify-items: center;
  align-items: center;
  transform: rotate(-6.5deg);
}
.add-recipe h1 {
  justify-self: start;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.8);
  color: white;
  grid-area: h1;
  background: linear-gradient(100deg, rgba(14, 150, 84) 0%, rgba(34, 72, 14, 0.6));
  background-size: cover;
}
.add-recipe img {
  transform: rotate(3deg);
  border-radius: 20px;
  height: 24vw;
  grid-area: img;
  padding-top: 30px;
}
.recipe-btn {
  grid-area: btn;
  height: 100px;
  width: 300px;
}
.add-recipe p {
  grid-area: txt;
  justify-self: end;
  margin: 0px;
  font-size: clamp(1rem, 5vw, 2rem);
  background: linear-gradient(100deg, rgba(63, 63, 63, 0.5) 0%, rgba(112, 111, 111, 0.3));
}
</style>
