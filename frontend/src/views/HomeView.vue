<template>
    <div>
        <h1>{{ saudacao }}, {{ getUsuario() }}</h1>
        <hr>
        <div class="chart-container">
            <BarChart />
        </div>
    </div>
</template>

<script setup>
import { getUsuario } from '../main';
import BarChart from '../components/InteractionChart.vue'
import { computed } from 'vue';

const saudacao = computed(() => {
    const dateTime = new Date();
    const horas = dateTime.toLocaleTimeString('pt-BR');
 
    if (horas < '06:00:00') { // antes de 6:30
        return 'Boa noite';
    } else if (horas < '12:00:00') { // antes de 12:00
        return 'Bom dia';
    } else if (horas < '18:00:00') { // antes de 18:00
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
});
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