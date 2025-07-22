<template>
    <div>
        <h1>To-do Lists Management</h1>
        <hr />
        <div>
            <button class="buttonDefault" @click="visible = true">Criar nova lista</button>

            <!-- Start Modal -->
            <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
                <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
                <div class="flex items-center gap-4 mb-4">
                    <label for="username" class="font-semibold w-24">List name</label>
                    <InputText type="text" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex items-center gap-4 mb-8">
                    <label for="email" class="font-semibold w-24">Description</label>
                    <InputText type="text" class="flex-auto" autocomplete="off" />
                </div>
                <div class="flex justify-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
                    <Button type="button" label="Save" @click="visible = false"></Button>
                </div>
            </Dialog>
            <!-- End modal -->
        </div>

        <!-- Lista de tarefas -->
        
    </div>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getIdUser } from '../main';
import Swal from 'sweetalert2';

const message = ref('');

const title = ref('');
const description = ref('');

const lists = ref([]);
const expandedRows = ref({});

const taskTitle = ref('');
const taskDescription = ref('');

const visible = ref(false);

// const addNewList = async () => {
//     console.log({ title: title.value, description: description.value });
//     try {
//         const response = await axios.post(`${import.meta.env.VITE_API_URL}/list/create`, {
//             title: title.value,
//             description: description.value,
//             tasks: [{
//                 name: null,
//                 status: null
//             }],
//             created_by: getIdUser()
//         });
//         closeModal();
//         await listAllList();
//         console.log(response);
//     } catch (error) {
//         console.error("Erro ao cadastrar:", error.response || error);
//         message.value = error.response?.data?.message || "Erro desconhecido ao logar.";
//     }
// };

// const listAllList = async () => {
//     try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/list/allLists`);
//         lists.value = response.data;
//     } catch (error) {
//         console.error("Erro ao buscar listas:", error.response || error);
//     }
// };

// const excluirLista = async (id) => {
//     const confirmacao = await Swal.fire({
//         title: 'Tem certeza?',
//         text: 'Essa ação irá excluir a lista permanentemente.',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         cancelButtonColor: '#3085d6',
//         confirmButtonText: 'Sim, excluir!',
//         cancelButtonText: 'Cancelar'
//     });
//     if (confirmacao.isConfirmed) {
//         try {
//             const response = await axios.delete(`${import.meta.env.VITE_API_URL}/list/delete`, {
//                 params: { id: id }
//             });
//             await listAllList();

//             await Swal.fire({
//                 title: 'Excluído!',
//                 text: 'A lista foi excluída com sucesso.',
//                 icon: 'success',
//                 timer: 2000,
//                 showConfirmButton: false
//             });

//             console.log(response);
//         } catch (error) {
//             console.error("Erro ao excluir a lista:", error.response || error);

//             await Swal.fire({
//                 title: 'Erro!',
//                 text: 'Não foi possível excluir a lista.',
//                 icon: 'error'
//             });
//         }
//     }
// };
</script>

<style scoped>
</style>