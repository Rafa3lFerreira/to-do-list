import { createApp } from 'vue'
import router from './router/router.js'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast'
import axios from "axios";

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCopy, faEdit, faHome, faList, faMagnifyingGlass, faPlus, faTrash, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faHome, faUser, faList, faUserTie, faEdit, faTrash, faPlus, faMagnifyingGlass, faCopy)

export function getUsuario() {
    return localStorage.getItem("usuario") || "Usuário";
}

export function getIdUser() {
    return localStorage.getItem("id");
}

export function getRole() {
    return localStorage.getItem("role");
}

export async function sendLog(message, level, details = {}) {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/log/create`, {
            message,
            level,
            details,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("Erro ao enviar log:", error);
    }
}

createApp(App)
    .component('Toast', Toast)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .use(PrimeVue, { theme: { preset: Aura } })
    .use(ToastService)
    .mount('#app')
