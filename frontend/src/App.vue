<template>
    <div id="app">
        <NavBar />

        <!-- Aqui as páginas serão carregadas -->
        <router-view />

        <footer>
            <p>© 2025 Meu App</p>
        </footer>
    </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
    components: { NavBar }
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    text-align: center;
}

nav a {
    margin-right: 10px;
}

</style>
