<template>
   <div class="card">
    <router-link :to="{ name: 'RecipeDetails', params: { id: recipe.id}}">
      <div class="single">
          <div class="card-image">
              <img :src="recipe.coverUrl">
          </div>
          <div class="card-text">
              <h2>{{ recipe.name }}</h2>
              <p>Created By: {{ recipe.userName }}</p>
              <p> {{ recipe.description }}</p>
          </div>
      </div>
    </router-link>
   </div>
</template>

<script>
export default {
  name: 'Recipe',
  props: ['recipe'],
};
</script>

<style scoped>
.card {
  display: grid;
  grid-template-columns: 280px;
  grid-template-rows: 400px;
  grid-template-areas: "image" "text";
  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 15px rgba(0,0,0,0.9);
  text-align: center;
}
.card-text {
  grid-area: text;

}
.card-image {
  grid-area: image;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  overflow: hidden;
  width:  100%;
  height: 250px;
}
.card-text {
  grid-area: text;
  margin: 25px;
}

p, h2 {
     white-space: nowrap;
     overflow: hidden;
     text-overflow: ellipsis;
}

img {
    overflow: hidden;
    max-height: 125%;
    max-width: 130%;
    width: auto;
    height: auto;
    object-fit: cover;
}
.card-text p {
  color: grey;
  font-size:15px;
  font-weight: 300;
}
.card-text h2 {
  margin-top:0px;
  font-size:28px;
}
.card:hover {
  transform: scale(1.15);
  box-shadow: 5px 5px 15px rgba(0,0,0,0.6);
}
*
.card {
  transition: all ease 0.2s;
  cursor: pointer;
  margin:30px;
}
</style>
