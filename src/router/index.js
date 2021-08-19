import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import HeroSection from '../views/HeroSection.vue';
import Register from '../views/Register.vue';
import CreateRecipe from '../views/CreateRecipe.vue';
import RecipeDetails from '../views/RecipeDetails.vue';
import store from '../store';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'HeroSection',
    component: HeroSection,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/create-recipe',
    name: 'CreateRecipe',
    meta: {
      requiresAuth: true,
    },
    component: CreateRecipe,
  },
  {
    path: '/recipe-details/:id',
    props: true,
    name: 'RecipeDetails',
    component: RecipeDetails,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'RecipesList' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
