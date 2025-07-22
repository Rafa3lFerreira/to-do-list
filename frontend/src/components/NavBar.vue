<template>
    <div class="navbar">
        <div class="nav-content">
            <span class="username">{{ getUsuario() }}</span>
            <div class="profile-pic">

            </div>
        </div>
    </div>
</template>

<script setup>
import { getUsuario } from '../main';
</script>
<style scoped>
.navbar {
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
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
    background-color: red;
}
</style>