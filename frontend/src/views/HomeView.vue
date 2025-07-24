<template>
    <div>
        <h4><i :class="iconeSaudacao" class=""></i>{{ saudacao }}, {{ getUsuario() }}</h4>
        <h5> {{ getDate() }}</h5>
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

const iconeSaudacao = computed(() => {
    const horaAtual = new Date().getHours()
    return horaAtual >= 6 && horaAtual < 18 ? 'pi pi-sun gapIcon' : 'pi pi-moon gapIcon'
})

const getDate = () => {
    const date = new Date();
    return date.toLocaleDateString('pt-BR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });
};
</script>

<style scoped>
.gapIcon {
  margin-right: 5px;
}
</style>