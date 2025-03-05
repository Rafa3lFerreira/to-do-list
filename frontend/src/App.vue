<template>
    <div id="app">
        <sideBar />
        <div id="content">
            <p>
                <strong>Current route path:</strong> {{ $route.fullPath }}
            </p>
            <RouterView />
            
            <footerComp />
        </div>
    </div>
</template>


<script>
import sideBar from './components/SideBar.vue'
import footerComp from './components/Footer.vue'
export default {
    components: { sideBar, footerComp }
};
</script>

<style>
#content {
    width: 100%;
    padding: 20px;
    flex-direction: column;
    flex-grow: 1;
}

nav a {
    margin-right: 10px;
}
</style>
