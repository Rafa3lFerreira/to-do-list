<template>
    <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Senha" required />
        <button type="submit">Login</button>
    </form>
    <p v-if="message">{{ message }}</p>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');
const message = ref('');

const login = async () => {
    console.log({ email: email.value, password: password.value });
    try {
        const response = await axios.post('http://localhost:5000/user/create', {
            email: email.value,
            password: password.value
        });

        message.value = response.data.message;
    } catch (error) {
        console.error("Erro ao logar:", error.response || error);
        message.value = error.response?.data?.message || "Erro desconhecido ao logar.";
    }

};
</script>