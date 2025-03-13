<!-- TodoDashboard.vue -->
<template>
    <h1>To-do Lists Management</h1>
    <hr>
    <div>
        <!-- Botão para abrir o modal -->
        <button @click="showModal = true">Criar nova lista</button>
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <span class="close" @click="showModal = false">&times;</span>
                <form class="formRegister" @submit.prevent="addNewList">
                    <input type="text" v-model="newListName" placeholder="Nome da nova lista" required />
                    <input type="text" v-model="newListDescription" placeholder="Descrição" required />
                    <button type="submit">Criar Lista</button>
                </form>
            </div>
        </div>
    </div>

    <div v-for="list in todoLists" :key="list.id" class="todo-list">
        Cabeçalho que, ao ser clicado, alterna a visibilidade das tasks
        <div class="todo-list-header" @click="toggleList(list.id)">
            <strong>{{ list.name }}</strong>
            <span class="pending">({{ countPending(list.tasks) }} pendentes)</span>
        </div>
        Dropdown com as tasks: aparece ou some com base na variável openList
        <div v-show="openList === list.id" class="todo-tasks">
            <ul>
                <li v-for="task in list.tasks" :key="task.id">
                    <input type="checkbox" v-model="task.done">
                    <span :class="{ done: task.done }">{{ task.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const newListName = ref('');
const newListDescription = ref('');
const showModal = ref(false);
const message = ref('');

const addNewList = async () => {
    console.log({ newListName: newListName.value });
    try {
        const response = await axios.post('http://localhost:5000/user/login', {
            newListName: newListName.value,
        });
        const { token, name, role } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("usuario", name);
        localStorage.setItem("role", role);

        message.value = response.data.message;
        setTimeout(() => {
            router.replace('/home')
        }, 2000);
    } catch (error) {
        console.error("Erro ao logar:", error.response || error);
        message.value = error.response?.data?.message || "Erro desconhecido ao logar.";
    }

};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
}

.close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
}

.formRegister {
    display: flex;
    gap: 10px;
    background: #ffffff;
    padding: 15px;
    border-radius: 4px;
    box-shadow: 0 2px 3px rgba(48, 48, 48, 0.30), 0 6px 10px rgba(48, 48, 48, 0.15);
    align-items: center;
}

.formRegister input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    transition: border 0.3s ease;
}

.formRegister input:focus {
    border-color: #777;
}

.formRegister button {
    padding: 10px 15px;
    background: #555;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease;
}

.formRegister button:hover {
    background: #777;
    transform: scale(1.05);
}


.todo-list {
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.todo-list-header {
    background: #f0f0f0;
    padding: 10px;
    cursor: pointer;
    display: flex;
}

.todo-tasks {
    padding: 10px;
    background: #fafafa;
}

.done {
    text-decoration: line-through;
    color: #999;
}

.pending {
    font-size: 0.9em;
    color: #555;
}
</style>