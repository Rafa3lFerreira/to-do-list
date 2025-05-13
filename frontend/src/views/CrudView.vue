<template>
    <div>
        <h1>To-do Lists Management</h1>
        <hr />
        <div>
            <button class="buttonDefault" @click="showModalAddList = true">Criar nova lista</button>

            <!-- Modal -->
            <div v-if="showModalAddList" class="modal">
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
        <div class="card">
            <DataTable v-model:expandedRows="expandedRows" :value="lists" dataKey="id" tableStyle="min-width: 60rem"
                rowExpansionMode="single" @rowExpand="onRowExpand" @rowCollapse="onRowCollapse">
                <Column expander style="width: 5rem">
                </Column>
                <Column field="title" header="Nome da Lista" />
                <Column field="description" header="Descrição da Lista" />
                <Column header="Ações">
                    <template #body="slotProps">
                        <button class="buttonDefault" @click="excluirLista(slotProps.data._id)">
                            <font-awesome-icon :icon="['fas', 'trash']" />
                        </button>
                    </template>
                </Column>
                <template #expansion="slotProps">
                    <div class="p-4">
                        <h5>Orders for {{ slotProps.data.name }}</h5>
                        <DataTable :value="slotProps.data.orders">
                            <Column field="id" header="Id" sortable></Column>
                            <Column field="customer" header="Customer" sortable></Column>
                            <Column field="date" header="Date" sortable></Column>
                            <Column field="amount" header="Amount" sortable>
                                <template #body="slotProps">
                                    {{ formatCurrency(slotProps.data.amount) }}
                                </template>
                            </Column>
                            <Column field="status" header="Status" sortable>
                                <template #body="slotProps">
                                    <Tag :value="slotProps.data.status.toLowerCase()"
                                        :severity="getOrderSeverity(slotProps.data)" />
                                </template>
                            </Column>
                            <Column headerStyle="width:4rem">
                                <template #body>
                                    <Button icon="pi pi-search" />
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </template>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { getIdUser } from '../main';
import Swal from 'sweetalert2';

const message = ref('');

const title = ref('');
const description = ref('');
const showModalAddTask = ref(false);
const showModalAddList = ref(false);

const lists = ref([]);
const expandedRows = ref({});

const taskTitle = ref('');
const taskDescription = ref('');
// const idList = ref('67e582df2ba343da8274f03a')
const closeModal = () => {
    showModalAddList.value = false;
};

// const closeModaljob = () => {
//     showModalAddTask.value = false;
// }

const addNewList = async () => {
    console.log({ title: title.value, description: description.value });
    try {
        const response = await axios.post('http://localhost:5000/list/create', {
            title: title.value,
            description: description.value,
            tasks: [{
                name: null,
                status: null
            }],
            created_by: getIdUser()
        });
        closeModal();
        await listAllList();
        console.log(response);
    } catch (error) {
        console.error("Erro ao cadastrar:", error.response || error);
        message.value = error.response?.data?.message || "Erro desconhecido ao logar.";
    }
};

// const addNewTask = async () => {
//     try {
//         const response = await axios.post('http://localhost:5000/list/taskCreate', {
//             idList,
//             arrayTask: [{
//                 name: taskTitle.value,
//                 description: taskDescription.value,
//                 status: taskStatus.value
//             }]
//         });
//         console.log(response);
//         closeModal();
//     } catch (error) {
//         console.error("Erro ao cadastrar:", error.response || error);
//         message.value = error.response?.data?.message || "Erro desconhecido ao logar.";
//     }
// };

const listAllList = async () => {
    try {
        const response = await axios.get("http://localhost:5000/list/allLists");
        lists.value = response.data;
    } catch (error) {
        console.error("Erro ao buscar listas:", error.response || error);
    }
};

const excluirLista = async (id) => {
    const confirmacao = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Essa ação irá excluir a lista permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    });
    if (confirmacao.isConfirmed) {
        try {
            const response = await axios.delete("http://localhost:5000/list/delete", {
                params: { id: id }
            });
            await listAllList();

            await Swal.fire({
                title: 'Excluído!',
                text: 'A lista foi excluída com sucesso.',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            });

            console.log(response);
        } catch (error) {
            console.error("Erro ao excluir a lista:", error.response || error);

            await Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível excluir a lista.',
                icon: 'error'
            });
        }
    }
};
const onRowExpand = (event) => {
    expandedRows.value = { [event.data.id]: event.data };
};

const onRowCollapse = (event) => {
    delete expandedRows.value[event.data.id];
};

onMounted(listAllList);
</script>

<style scoped>
.full {
    width: 100%;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal-content {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease;
    position: relative;
}

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

.modal-form textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
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

.header {
    display: flex;
    justify-content: space-between;
}
</style>