<template>
    <div>
        <h4>Lists</h4>
        <hr>

        <div class="accordition-body">
            <div @click="toggle(1)" class="item-header">
                <i class="pi pi-angle-right"></i>
                Yesterday List
            </div>
            <Transition name="fade">
                <div v-if="openItem === 1" class="item-content">
                    <template v-for="(listYesterday, index) in resYesterday" :key="index">
                        <div class="list-task">
                            <label class="circle-check">
                                <input type="checkbox" @change="updateStatus(listYesterday._id)"
                                    :checked="listYesterday.status === 'COMPLETED'" />
                                <span class="checkmark">
                                    <i class="pi pi-check"></i>
                                </span>
                            </label>
                            <p>{{ listYesterday.name }}</p>
                        </div>
                    </template>
                </div>
            </Transition>
            <!-- Item 2 -->
            <div @click="toggle(2)" class="item-header">
                <i class="pi pi-angle-right" v-if="openItem = 2" ></i>
                Today List
            </div>
            <Transition name="fade">
                <div v-if="openItem === 2" class="item-content">
                    <template v-for="(listToday, index) in res" :key="index">
                        <div class="list-task">
                            <label class="circle-check">
                                <input type="checkbox" @change="updateStatus(listToday._id)"
                                    :checked="listToday.status === 'COMPLETED'" />
                                <span class="checkmark">
                                    <i class="pi pi-check"></i>
                                </span>
                            </label>
                            <p>{{ listToday.name }}</p>
                        </div>
                    </template>
                </div>
            </Transition>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import dayjs from 'dayjs';

const openItem = ref(null);

const res = ref([]);
const resYesterday = ref([]);

function toggle(itemNumber) {
    openItem.value = openItem.value === itemNumber ? null : itemNumber;
}


const getLists = async (date) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/list/getTask`, {
            params: { date }
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const getTodayList = async () => {
    const today = dayjs().format('YYYY-MM-DD');
    const response = await getLists(today);
    res.value = response;

    return res;
}

const getYesterdayList = async () => {
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const response = await getLists(yesterday);
    resYesterday.value = response;

    return resYesterday;
}

onMounted(() => {
    getTodayList();
    getYesterdayList();
});

</script>

<style scoped>
.accordition-body {
    width: 100%;
    background-color: var(--sidebar-bg);
    box-shadow: var(--sidebar-box-shadow);
    border-radius: 10px;
    padding: 10px;
}

.item-header {
    cursor: pointer;
    padding: 10px;
    margin-top: 8px;
    border-radius: 4px;
}

.item-content {
    transition: all 0.3s ease;
    padding: 10px;
    margin-bottom: 8px;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    max-height: 0;
    padding: 0;
    margin: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    max-height: 200px;
}

.list-task {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    margin: 6px;
}

.list-task input[type="checkbox"] {
    display: none;
}

.list-task .checkmark {
    height: 20px;
    width: 20px;
    border: 1px solid var(--checkbox-border-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
}

.list-task .checkmark .pi-check {
    display: none;
    color: var(--checkbox-check);
}

.list-task input[type="checkbox"]:checked+.checkmark .pi-check {
    display: block;
}

.list-task p {
    margin-left: 5px;

}
</style>
