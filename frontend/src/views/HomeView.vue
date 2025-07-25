<template>
    <div>
        <h4 class="title-text"><i :class="iconeSaudacao" class=""></i>{{ saudacao }}, {{ getUsuario() }}</h4>
        <h4> {{ getDate() }}</h4>
        <hr>

        <div class="dayList-block">
            <InputText type="text" v-model="task" class="inputPadding" placeholder="Add a task" />
            <hr>
            <Button label="Create" icon="pi pi-plus" @click="addList()" />
        </div>


    </div>
</template>

<script setup>
import { getUsuario } from '../main';
import { computed, ref } from 'vue';
import axios from 'axios';

// imports do primevue
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';

const task = ref('');
const toast = useToast();

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

const addList = async () => {
    console.log("Add list function", task.value)

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/list/taskCreate`, {name: task.value, created_by: getUsuario()})

        task.value = '';
        
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: response.data.message,
            life: 3000
        });
    } catch (error) {
        console.log(error)
        toast.add({
            severity: 'Error',
            summary: 'Error',
            detail: error,
            life: 3000
        });
    }
}
</script>

<style scoped>
.gapIcon {
    margin-right: 5px;
}

.title-text {
    padding-top: 10px;
}

.dayList-block {
    width: 100%;
    background-color: var(--sidebar-bg);
    box-shadow: var(--sidebar-box-shadow);
    border-radius: 10px;
    height: 120px;
}

.inputPadding {
    width: 98.5%;
    border-radius: 10px;
    margin: 10px;
    border: none;
    background-color: var(--sidebar-bg);
}

.dayList-block hr {
    margin: 6px;
}

.dayList-block button {
    float: right;
    margin: 5px 10px 0px 0px;
    background-color: var(--navbar-bg);
    border-color: none;
}
</style>