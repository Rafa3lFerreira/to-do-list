<template>
    <div class="contentTitle">
        <h1>User Management</h1>
        <div class="mainContent">
            <div class="btnTable">
                <button @click="registerNew">
                    Register
                </button>
                <button>
                    Filtro
                </button>
            </div>
            <div class="tableUsers">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user._id }}</td>
                            <td>{{ user.name }}</td>
                            <td>{{ user.email }}</td>
                            <td>{{ user.role }}</td>
                            <td class="user-actions">
                                <button @click="editarUsuario(user._id)">
                                    <font-awesome-icon :icon="['fas', 'edit']" />
                                </button>
                                <button @click="excluirUsuario(user._id)">
                                    <font-awesome-icon :icon="['fas', 'trash']" />
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);

const listUsers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/user/list");
        users.value = response.data;
        console.log(users.value);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error.response || error);
    }
};

onMounted(listUsers);

const editarUsuario = (id) => {
    console.log("Editar usuário:", id);
};

const excluirUsuario = (id) => {
    console.log("Excluir usuário:", id);
};
</script>

<style scoped>
.btnTable {
    display: flex;
    gap: 10px;
}
</style>