<template>
    <NavBar />
    <div id="app">
        <h1>Lista de Tarefas</h1>
        <TaskList />
    </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import NavBar from './components/NavBar.vue'
export default {
    components: { TaskList, NavBar }
};
</script>

<style>
body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin: 20px;
}
</style>
