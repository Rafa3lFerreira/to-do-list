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
                    <button class="buttonDefault" @click="listLogByUser(slotProps.data._id)">
                        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
                    </button>
                    <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
                        <div class="modal-content">
                            <h2>Logs do Usuário</h2>
                            <button @click="closeModal">Fechar</button>

                            <ul>
                                <li v-for="(log, index) in userLogs" :key="index">
                                    {{ log.timestamp }} - {{ log.action }}
                                </li>
                            </ul>
                        </div>
                    </div>
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

import { sendLog, getIdUser } from '../main';

const toast = useToast()
const users = ref([]);

const userLogs = ref([])
const showModal = ref(false)

const listUsers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/list`);
        users.value = response.data;
        console.log(users.value);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error.response || error);
    }
};

onMounted(listUsers);

const registerNew = async () => {

}

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
            await axios.delete(`${import.meta.env.VITE_API_URL}/user/delete/`, { params: { id: id } });

            const details = {
                user_id: getIdUser(),
                action: "delete",
                deleted_user: id,
                ip: "não implementado"
            };

            sendLog('User delete', 'INFO', details);

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

const listLogByUser = async (id) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/log/search`, { params: { id: id } })

        toast.add({
            severity: 'success',
            summary: 'Busca realizada',
            life: 3000
        });

        userLogs.value = response.logs
        showModal.value = true
    } catch (error) {
        toast.add({
            severity: 'error',
            summary: 'Erro ao consultar',
            detail: 'Erro ao consultar logs do usuário: ' + (error.response?.data?.message || error.message),
            life: 5000
        });
    }
}

const closeModal = () => {
  showModal.value = false
}
</script>

<style scoped>
.btnTable {
    display: flex;
    gap: 10px;
}
</style>