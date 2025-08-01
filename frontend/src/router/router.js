import { createMemoryHistory, createRouter } from 'vue-router'

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';
import ListView from '../views/ListView.vue';
import LandingView from '../views/LandingView.vue';

const routes = [
  { path: '/', component: LandingView },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/home', component: HomeView },
  { path: '/list', component: ListView },
  {
    path: '/admin', component: AdminView, meta: { requiresAuth: true, role: "admin" }
  },
];
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next("/login");
  } else {
    next();
  }
});


export default router