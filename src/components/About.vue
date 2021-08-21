<template>
  <section>
    <h1>The FoodHub Team</h1>
    <div class="container">
      <p>
        FoodHub is a trusted resource for home cooks with many tested recipes, guides, and meal
        plans, drawing readers from around the world. We’re supported by a group of recipe
        developers, food writers, recipe and product testers, photographers, and other creative
        professionals.
      </p>
      <img src="/images/chef.jpg" />
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  padding: 90px 30px 0;
  background: rgba(255, 195, 161, 0.705);
  height: 70vh;
}
.container {
  display: flex;
  align-content: center;
  align-items: center;
}
h1 {
  font-style: normal;
  // font-weight: bold;
  font-weight: 600;
  color: #353333;
  font-size: 9vmin;
  letter-spacing: 0.03em;
  line-height: 1;
  // text-shadow: 1px 2px 3px rgba(0, 0, 0, 0.8);
  margin-bottom: -70px;
}
img {
  width: 35%;
  height: 380px;
  border-radius: 50%;
}
p {
  font-size: 25px;
  flex: 2 1 auto;
}
</style>
