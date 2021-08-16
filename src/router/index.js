import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import CreateRecipe from '../views/CreateRecipe.vue';
import RecipesList from '../views/RecipesList.vue';
import RecipeDetails from '../components/RecipeDetails.vue';
import AppHeader from '../components/Header.vue';
import store from '../store';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
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
    path: '/',
    name: 'RecipesList',
    component: RecipesList,
  },
  {
    path: '/recipe-details/:id',
    props: true,
    name: 'RecipeDetails',
    component: RecipeDetails,
  },
  {
    path: '/header',
    name: 'Header',
    component: AppHeader,
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
