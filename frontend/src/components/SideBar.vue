<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <button class="toggle-btn" @click="isCollapsed = !isCollapsed">
        {{ isCollapsed ? '☰' : '☰' }}
      </button>
    </div>

    <div class="sidebar-content" v-if="!isCollapsed">
      <RouterLink to="/home" class="item"><i class="pi pi-home gapIcon" style="font-size: 1rem"></i>Home</RouterLink>
      <RouterLink to="/crud" class="item"><i class="pi pi-list-check gapIcon" style="font-size: 1rem"></i>Lists</RouterLink>
      <RouterLink to="/admin" class="item" v-if="getRole() === 'admin'"><i class="pi pi-user gapIcon" style="font-size: 1rem"></i>Admin Area</RouterLink>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import { getRole } from '../main';

const isCollapsed = ref(false);
</script>



<style scoped>
.sidebar {
  width: 250px;
  background-color: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  padding-top: 45px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: var(--sidebar-box-shadow);
  top: 0;
  left: 0;
  height: 100vh;
}

.sidebar.collapsed {
  width: 50px;
  box-shadow: none;
}

.sidebar-header {
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
}

.toggle-btn {
  color: var(--sidebar-toggle-btn);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  padding: 15px 20px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
}

.item {
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 10px;
  color: var(--sidebar-text);
  text-decoration: none;
  border-radius: 10px;
  transition: background 0.3s ease, transform 0.3s ease;
  white-space: nowrap;
  box-sizing: border-box;
}

.item:hover {
  background-color: var(--sidebar-hover-bg);
  transform: scale(1.02);
}

.gapIcon {
  margin-right: 10px;
}

</style>
