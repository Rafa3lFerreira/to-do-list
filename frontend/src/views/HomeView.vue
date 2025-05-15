<template>
    <div>
        <h1>Bem vindo, {{ getUsuario() }}</h1>
        <hr>
        <button @click="criaLog()">Teste</button>
        <div class="chart-container">
            <BarChart />
        </div>
    </div>
</template>

<script setup>
import { getIdUser, getUsuario, sendLog } from '../main';
import BarChart from '../components/InteractionChart.vue'

const criaLog = () => {
    const details = {
        id: getIdUser(),
        action: "Teste2",
        usuario: getUsuario(),
        ip: "teste2"
    };

    sendLog('Isso é um teste2', 'INFO', details);
}
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