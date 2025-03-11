import { createApp } from 'vue'
import router from './router/router.js'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faEdit, faHome, faList, faPlus, faTrash, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faHome, faUser, faList, faUserTie, faEdit, faTrash, faPlus)

export function getUsuario() {
    return localStorage.getItem("usuario") || "Usuário";
}

export function getRole() {
    return localStorage.getItem("role");
}

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
