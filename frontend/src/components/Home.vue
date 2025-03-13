<template>
    <div>
        <h1>Bem vindo, {{ getUsuario() }}</h1>
        <hr>
    </div>
</template>

<script setup>
import { getUsuario } from '../main';
</script>

<style scoped>
.home-container {
    background: #f5f5f5;
}
</style>