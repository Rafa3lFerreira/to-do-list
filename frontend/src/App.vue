<template>
    <div id="app">
        <Toast />
        <navBar v-if="!isLoginOrRegister" />
        <sideBar v-if="!isLoginOrRegister" />
        <div :class="isLoginOrRegister ? 'main' : 'main content'">
            <RouterView />
        </div>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import sideBar from './components/SideBar.vue'

export default {
    components: { sideBar, NavBar },
    computed: {
        isLoginOrRegister() {
            return this.$route.fullPath == '/' || this.$route.fullPath == '/register';
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

.content {
    margin: 40px 20px 20px 20px;
}
</style>