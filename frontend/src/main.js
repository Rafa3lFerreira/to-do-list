import { createApp } from 'vue'
import router from './router/router.js'
import './style.css'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faHome, faRegistered, faUser } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faHome, faRegistered, faUser)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
