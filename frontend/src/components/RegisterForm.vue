<template>
  <form @submit.prevent="register">
    <input v-model="name" type="text" placeholder="Nome" required />
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Senha" required />
    <button type="submit">Cadastrar</button>
    <p v-if="message">{{ message }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');
const message = ref('');

const register = async () => {
  console.log({ name: name.value, email: email.value, password: password.value });
  try {
    const response = await axios.post('http://localhost:5000/user/create', {
      name: name.value,
      email: email.value,
      password: password.value
    });

    message.value = response.data.message;
  } catch (error) {
    console.error("Erro ao registrar:", error.response || error);
    message.value = error.response?.data?.message || "Erro desconhecido ao cadastrar.";
  }

};
</script>