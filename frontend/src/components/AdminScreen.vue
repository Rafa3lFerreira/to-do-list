<template>
    <div class="contentTitle">
        <h1>User Management</h1>
        <hr>
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
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col" class="alignLeft">ID</th>
                            <th scope="col" class="alignLeft">Name</th>
                            <th scope="col" class="alignLeft">Email</th>
                            <th scope="col" class="alignLeft">Role</th>
                            <th scope="col" class="alignMiddle">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <th scope="row" class="alignLeft">{{ user._id }}</th>
                            <td class="alignLeft">{{ user.name }}</td>
                            <td class="alignLeft">{{ user.email }}</td>
                            <td class="alignLeft">{{ user.role }}</td>
                            <td class="alignMiddle">
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
    align-items: flex-end;
}

.tableUsers {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    transition: border 0.3s ease;
}

.table {
    width: 100%;
    border-collapse: collapse; 
}

.alignLeft {
    padding-left: 10px;
    text-align: left;
}

.alignMiddle {
    text-align: center;
    padding-left: 10px;
}
.table tbody tr {
    border-bottom: 1px solid #ddd;
}

.table tbody tr:last-child {
    border-bottom: none;
}
</style>