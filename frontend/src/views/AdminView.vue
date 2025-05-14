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
                    <button class="buttonDefault" @click="excluirUsuario(slotProps.data._id)">
                        <font-awesome-icon :icon="['fas', 'trash']" />
                    </button>
                    <button class="buttonDefault" @click="verLog(slotProps.data._id)">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
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

import Swal from 'sweetalert2';
import { useToast } from 'primevue/usetoast'

import { sendLog } from '../main';

const toast = useToast()
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

const excluirUsuario = async (id) => {
    const alert = await Swal.fire({
        title: "Deseja excluir este usuário?",
        text: "Não é possível reverter essa ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim!",
        cancelButtonText: "Não!"
    }); if (alert.isConfirmed) {
        try {
            await axios.delete("http://localhost:5000/user/delete/", { params: { id: id } });

            sendLog('Delete', 'INFO', {})
            toast.add({
                severity: 'success',
                summary: 'Usuário excluído',
                detail: 'O usuário foi removido com sucesso!',
                life: 3000
            });
            await listUsers();

        } catch (error) {
            toast.add({
                severity: 'error',
                summary: 'Erro ao excluir',
                detail: 'Erro ao excluir usuário: ' + (error.response?.data?.message || error.message),
                life: 5000
            });
        }
    }
};
</script>

<style scoped>
.btnTable {
    display: flex;
    gap: 10px;
}
</style>