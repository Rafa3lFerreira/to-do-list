<!-- TodoDashboard.vue -->
<template>
    <div>
        <h1>To-do Lists Management</h1>
        <hr />
        <div>
            <button @click="showModal = true">Criar nova lista</button>

            <!-- Modal -->
            <div v-if="showModal" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Registro de lista</h2>
                        <span class="close" @click="closeModal">&times;</span>
                    </div>
                    <!-- Formulário do modal: utilizei a classe "modal-form" para evitar conflito com outros formulários -->
                    <form class="modal-form" @submit.prevent="addNewList">
                        <input type="text" v-model="title" placeholder="Nome da nova lista" required />
                        <input type="text" v-model="description" placeholder="Descrição" required />
                        <button type="submit">Criar Lista</button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Lista de tarefas -->
        <div v-for="list in lists" :key="list.id" class="todo-list">
            <div class="todo-list-header" @click="toggleList(list.id)">
                <strong>{{ list.name }}</strong>
                <span class="pending">({{ countPending(list.tasks) }} pendentes)</span>
            </div>
            <div v-show="openList === list.id" class="todo-tasks">
                <ul>
                    <li v-for="task in list.tasks" :key="task.id">
                        <input type="checkbox" v-model="task.done" />
                        <span :class="{ done: task.done }">{{ task.name }}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const title = ref('');
const description = ref('');
const showModal = ref(false);
const message = ref('');

const lists = ref([]);

const closeModal = () => {
    showModal.value = false;
};

const addNewList = async () => {
    console.log({ title: title.value, description: description.value });
    try {
        const response = await axios.post('http://localhost:5000/list/create', {
            title: title.value,
            description: description.value
        });
        closeModal();
        console.log(response);
    } catch (error) {
        console.error("Erro ao cadastrar:", error.response || error);
        message.value = error.response?.data?.message || "Erro desconhecido ao logar.";
    }

};

const listAllList = async () => {
    try {
        const response = await axios.get("http://localhost:5000/list/list");
        lists.value = response.data;
        console.log(users.value);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error.response || error);
    }
};

onMounted(listAllList);
</script>

<style scoped>
/* Modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Fundo semi-transparente */
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

/* Conteúdo do modal */
.modal-content {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease;
    position: relative;
}

/* Botão de fechar */
.close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 24px;
    cursor: pointer;
    color: #aaa;
    transition: color 0.2s;
}

.close:hover {
    color: #000;
}

.modal-form input {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px 0px 10px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    transition: border 0.3s ease;
}

.modal-form button {
    width: 100%;
    padding: 10px;
    background: #3498db;
    border: none;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.2s;
}

.modal-form button:hover {
    background: #2980b9;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Estilos da lista de tarefas */
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
    justify-content: space-between;
    align-items: center;
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