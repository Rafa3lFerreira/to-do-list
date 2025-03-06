import { createMemoryHistory, createRouter } from 'vue-router'

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CrudView from '../views/CrudView.vue';
import HomeView from '../views/HomeView.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/home', component: HomeView },
  { path: '/register', component: RegisterView },
  { path: '/crud', component: CrudView },
];
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router