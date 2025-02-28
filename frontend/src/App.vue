<template>
    <div id="app">
        <NavBar />
        <main>
            <p>
                <strong>Current route path:</strong> {{ $route.fullPath }}
            </p>
            <RouterView />
        </main>
        <footer>
            <p>© 2025 Meu App</p>
        </footer>
    </div>
</template>

<script>
import { RouterView } from 'vue-router';
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
