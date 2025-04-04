import { createMemoryHistory, createRouter } from 'vue-router'

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CrudView from '../views/CrudView.vue';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/home', component: HomeView },
  { path: '/register', component: RegisterView },
  { path: '/crud', component: CrudView },
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