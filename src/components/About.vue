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
  // padding: 90px 30px 30px;
  background: rgba(233, 233, 217, 0.705);
  height: 45vw;
  min-height: 400px;
  position: relative;
  padding-top: 30px;
}
.container {
  display: flex;
  align-content: center;
  align-items: center;
  padding: 0 40px;
  height: 60%;
}
h1 {
  font-style: normal;
  font-weight: 600;
  color: #353333;
  // padding-top: -50px;
  font-size: clamp(1.3rem, 4vw, 4rem);
  letter-spacing: 0.03em;
  line-height: 1;
  padding: 30px 40px 0;
}
img {
  width: 35%;
  height: 35vw;
  border-radius: 50%;
  object-fit: cover;
}
p {
  font-size: clamp(1rem, 2vw, 1.7rem);
  flex: 2 1 auto;
  line-height: 1.7;
}
@media (max-width: 490px) {
  img {
    display: none;
  }
  .container {
    flex-direction: column;
    align-content: center;
    justify-content: center;
    overflow: hidden;
  }
  p {
    line-height: 1.5;
    flex-grow: 1;
    padding-top: 40px;
  }
}
</style>
