<template>
    <div id="app">
        <sideBar v-if="showSideBar" />
        <div class="main">
            <div id="content">
                <RouterView />
            </div>
        </div>
    </div>
</template>

<script>
import sideBar from './components/SideBar.vue'
import footerComp from './components/Footer.vue'
import NavBar from './components/NavBar.vue'
export default {
    components: { sideBar },
    computed: {
        // Exemplo: esconde a sidebar na rota de login, que seria a rota '/'
        showSideBar() {
            return this.$route.fullPath !== '/'
        }
    }
}


</script>

<style>
#app {
    display: flex;
    min-height: 100vh;
}

.main {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

#content {
    padding: 20px;
}

nav {
    width: 100%;
}
</style>