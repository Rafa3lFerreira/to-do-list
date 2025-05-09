<template>
  <div class="sidebar">
    <div class="white-space">
      <img src="../assets/logo_to_do_list.png" alt="">
    </div>
    <RouterLink to="/home" class="item">Home</RouterLink>
    <RouterLink to="/crud" class="item">Crud</RouterLink>
    <RouterLink to="/admin" class="item" v-if="getRole() == 'admin'">Admin Area</RouterLink>
  </div>
</template>

<script setup>
import { getRole } from '../main';
</script>

<style scoped>
.white-space {
  width: 100%;
  height: 60px;
}

.white-space img {
  width: 100%;
  height: 60px;
  object-fit: cover;
}

.sidebar {
  width: 200px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 10px;
  border-right: 1px solid #e0e0e0;
}

.sidebar .item {
  width: 100%;
  padding: 15px 20px;
  margin-bottom: 10px;
  color: black;
  text-decoration: none;
  border-radius: 10px;
  transition: background 0.3s ease, transform 0.3s ease;
}

.sidebar .item:hover {
  background-color: #eff1f8;
  transform: scale(1.02);
}
</style>
