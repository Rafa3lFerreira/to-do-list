<template>
  <div class="white-space"></div>

  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-header">
      <button class="toggle-btn" @click="isCollapsed = !isCollapsed">
        {{ isCollapsed ? '☰' : '☰' }}
      </button>
    </div>

    <div class="sidebar-content" v-if="!isCollapsed">
      <RouterLink to="/home" class="item">Home</RouterLink>
      <RouterLink to="/crud" class="item">Lists</RouterLink>
      <RouterLink to="/admin" class="item" v-if="getRole() === 'admin'">Admin Area</RouterLink>
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
  width: 200px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  overflow: hidden;
  box-shadow: 0px 0.3px 0.9px rgba(0, 0, 0, 0.1), 0px 1.6px 3.6px rgba(0, 0, 0, 0.1);
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
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  width: 100%;
  text-align: center;
  padding: 10px 0;
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
  color: black;
  text-decoration: none;
  border-radius: 10px;
  transition: background 0.3s ease, transform 0.3s ease;
  white-space: nowrap;
  box-sizing: border-box;
}

.item:hover {
  background-color: #eff1f8;
  transform: scale(1.02);
}
</style>
