<template>
    <div>
        <h4>Lists</h4>
        <hr>

        <div class="accordition-body">
            <div @click="toggle(1)" class="item-header">
                <i class="pi pi-angle-right"></i>
                Conteudo Item 0
            </div>
            <Transition name="fade">
                <div v-if="openItem === 1" class="item-content">
                    Conteúdo do item 1
                </div>
            </Transition>
            <!-- Item 2 -->
            <div @click="toggle(2)" class="item-header">
                <i class="pi pi-angle-right"></i>
                Item 2
            </div>
            <Transition name="fade">
                <div v-if="openItem === 2" class="item-content">
                    Conteúdo do item 2
                </div>
            </Transition>
            <!-- Item 3 -->
            <div @click="toggle(3)" class="item-header">
                <i class="pi pi-angle-right"></i>
                Item 3
            </div>
            <Transition name="fade">
                <div v-if="openItem === 3" class="item-content">
                    Conteúdo do item 3
                </div>
            </Transition>
            <!-- Item 4 -->
            <div @click="toggle(4)" class="item-header">
                <i class="pi pi-angle-right"></i>
                Item 4
            </div>
            <Transition name="fade">
                <div v-if="openItem === 4" class="item-content">
                    Conteúdo do item 4
                </div>
            </Transition>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const openItem = ref(null);

function toggle(itemNumber) {
    openItem.value = openItem.value === itemNumber ? null : itemNumber;
}

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
</style>
