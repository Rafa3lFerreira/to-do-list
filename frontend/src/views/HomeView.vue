<template>
    <div>
        <h1>{{ saudacao }}, {{ getUsuario() }}</h1>
        <hr>
        
    </div>
</template>

<script setup>
import { getUsuario } from '../main';
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

</style>