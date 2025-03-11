<!-- TodoDashboard.vue -->
<template>
    <h1>To-do Lists Management</h1>

    <form @submit.prevent="addNewList">
        <input type="text" v-model="newListName" placeholder="Nome da nova lista" required />
        <button type="submit">Criar Lista</button>
    </form>

    <div v-for="list in todoLists" :key="list.id" class="todo-list">
        <!-- Cabeçalho que, ao ser clicado, alterna a visibilidade das tasks -->
        <div class="todo-list-header" @click="toggleList(list.id)">
            <strong>{{ list.name }}</strong>
            <span class="pending">({{ countPending(list.tasks) }} pendentes)</span>
        </div>
        <!-- Dropdown com as tasks: aparece ou some com base na variável openList -->
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
const newListName = ref('');

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