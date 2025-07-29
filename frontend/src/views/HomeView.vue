<template>
    <div>
        <h4 class="title-text"><i :class="greetingIcon" class=""></i>{{ greeting }}, {{ getUser() }}</h4>
        <h4> {{ getDate() }}</h4>
        <hr>

        <div class="dayList-block">
            <InputText type="text" v-model="task" class="inputPadding" placeholder="Add a task" />
            <hr>
            <Button label="Create" icon="pi pi-plus" @click="addList()" />
        </div>

        <div class="todaylist-block">
            <h4 class="title-text">Today Tasks</h4>
            <hr>
            <template v-for="(listTask, index) in listTasks" :key="index">
                <div class="list-task">
                    <p> {{ listTask.name }}</p>
                    <Button icon="pi pi-pencil" @click="showTask = true" />


                </div>
            </template>
            <p v-if="listTasks.length == 0">No tasks for today.</p>
        </div>
    </div>
    <Dialog v-model:visible="showTask" modal header="Edit task" :style="{ width: '45rem' }">
        <div class="edit-task">

            <div class="bar-task">
                <Select v-model="selectedStatus" :options="status" optionLabel="name" placeholder="Select a status"
                    class="w-full md:w-56" />
            </div>
        </div>
    </Dialog>
</template>

<script setup>
import { getUser } from '../main';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

// imports do primevue
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog';
import Select from 'primevue/select';

const task = ref('');
const toast = useToast();

const listTasks = ref([]);

const status = ref([]);

const showTask = ref(false);

onMounted(() => {
    listTodayTask();
});

const greeting = computed(() => {
    const dateTime = new Date();
    const hours = dateTime.toLocaleTimeString('pt-BR');

    if (hours < '06:00:00') { // antes de 6:30
        return 'Boa noite';
    } else if (hours < '12:00:00') { // antes de 12:00
        return 'Bom dia';
    } else if (hours < '18:00:00') { // antes de 18:00
        return 'Boa tarde';
    } else {
        return 'Boa noite';
    }
});

const greetingIcon = computed(() => {
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
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/list/taskCreate`, { name: task.value, created_by: getUser() })

        task.value = '';
        listTodayTask();

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

const listTodayTask = async () => {
    try {
        const date = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/list/todayTask`, { params: { date } });
        listTasks.value = response.data;
        console.log(listTasks.value);
    } catch (error) {

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

.todaylist-block {
    width: 100%;
    background-color: var(--sidebar-bg);
    box-shadow: var(--sidebar-box-shadow);
    border-radius: 10px;
    padding-bottom: 5px;
}

.todaylist-block .title-text {
    padding-top: 10px;
    padding-left: 10px;
}

.todaylist-block p {
    color: var(--text-color);
    padding-left: 10px;
}

.todaylist-block hr {
    margin: 6px
}

.list-task {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding-left: 10px;
    padding-right: 10px;
    margin-left: 6px;
    margin-right: 6px;
    margin-bottom: 6px;
}

.edit-task{
    display: flex;
}

.bar-task {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: right;
    width: 50px;
    overflow: hidden;
}
</style>