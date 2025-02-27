import { createMemoryHistory, createRouter } from 'vue-router'

import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import CrudView from '../views/CrudView.vue';

const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/crud', component: CrudView },
];
const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router