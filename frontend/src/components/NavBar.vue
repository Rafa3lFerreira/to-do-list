<template>
  <div class="navbar">
    <div class="nav-content">
      <div class="card flex justify-center">
        <ToggleSwitch v-model="checked" @change="toggleDarkMode" />
      </div>
      <div class="profile-pic">
        <img :src="`https://ui-avatars.com/api/?name=${getUsuario()}&background=20C997&color=fff`" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getUsuario } from '../main'
import ToggleSwitch from 'primevue/toggleswitch'

const checked = ref(false)

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('dark', checked.value)
  localStorage.setItem('darkMode', checked.value)
}

onMounted(() => {
  const saved = localStorage.getItem('darkMode') === 'true'
  checked.value = saved
  document.documentElement.classList.toggle('dark', saved)
})
</script>

<style scoped>
.navbar {
  width: 100%;
  height: 60px;
  background-color: var(--navbar-bg);
  color: var(--navbar-text);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s, color 0.3s;
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.profile-pic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  overflow: hidden;
  border: 1.8px solid #fff;
}

.profile-pic img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.navbar a:hover {
  color: #DCEEFF;
}
</style>
