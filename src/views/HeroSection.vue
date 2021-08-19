<template>
  <div>
    <section class="masthead" role="img" aria-label="Image Description">
      <h1>Food<span>Hub</span></h1>
      <p>
        Get inspired by our nutritious flavour-packed recipes, <br />
        add your own delicious recipes and share them with the world.
      </p>
      <button class="animate__animated animate__fadeInLeft">
        Browse Recipes
      </button>
    </section>
    <RecipesList />
  </div>
</template>

<script>
import RecipesList from '@/components/RecipesList.vue';

export default {
  components: {
    RecipesList,
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
.masthead > button {
  margin-left: 30px;
  position: absolute;
  top: 80%;
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

button {
  background: rgb(17, 184, 103) !important;
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
  background: #63b6b8;
}
button:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
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
</style>
