<template>
    <div>
        <h1>Bem vindo, {{ getUsuario() }}</h1>
        <hr>
        <div class="chart-container">
            <BarChart />
        </div>
    </div>
</template>

<script setup>
import { getUsuario } from '../main';
import BarChart from '../components/InteractionChart.vue'


</script>

<style scoped>
.chart-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 60vh;
}
</style>