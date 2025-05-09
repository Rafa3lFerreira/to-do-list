<template>
    <div class="contentTitle">
        <h1>User Management</h1>
        <hr>
        <div class="btnTable">
            <button class="buttonDefault" @click="registerNew">
                Register
            </button>
            <button class="buttonDefault">
                Filtro
            </button>
        </div>
        <DataTable :value="users" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
            tableStyle="min-width: 50rem">
            <Column field="_id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="role" header="Role"></Column>
            <Column header="Actions">
                <template #body="slotProps">
                    <button class="buttonDefault" @click="editarUsuario(slotProps.data._id)">
                        <font-awesome-icon :icon="['fas', 'edit']" />
                    </button>
                    <button class="buttonDefault"
                        @click="excluirUsuario(slotProps.data._id)">
                        <font-awesome-icon :icon="['fas', 'trash']" />
                    </button>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
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