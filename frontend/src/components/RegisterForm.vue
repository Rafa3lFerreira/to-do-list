<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Crie a sua conta</h2>
      <form @submit.prevent="register">
        <div class="input-group">
          <label for="nome">Nome</label>
          <input v-model="name" type="text" id="nome" required />
          <span :style="{ color: errorMessage }">{{ messageName }}</span>
        </div>
        <div class="input-group">
          <label for="email">E-mail</label>
          <input v-model="email" type="email" id="email" required />
        </div>
        <div class="input-group">
          <label for="password">Senha</label>
          <input v-model="password" type="password" id="password" required />
          <span :style="{ color: errorMessage }">{{ messagePassword }}</span>
        </div>
        <div class="input-group">
          <label for="confirmPassword">Confirme a senha</label>
          <input v-model="confirmPassword" type="password" id="confirmPassword" required />
          <span :style="{ color: errorMessage }">{{ messageConfirmPassword }}</span>
        </div>
        <button type="submit" class="register-button">Cadastrar</button>
        <span v-if="message.text" :style="{ color: message.color }">{{ message.text }}
        </span>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Campos do form
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// Váriaveis de mensagem de erro e sucesso
const messagePassword = ref('');
const messageName = ref('');
const messageConfirmPassword = ref('');
const message = ref({ text: "", color: "" });

// Váriavel para adicionar o style nas mensagens de erro
const errorMessage = ref('red');

const register = async () => {
  // Aqui zero o valor das mensagens de erro após cada tentativa de registro
  messagePassword.value = '';
  messageName.value = '';
  messageConfirmPassword.value = '';

  console.log({ name: name.value, email: email.value, password: password.value });
  // Validação da senha se é menor que 6 caracteres
  if (password.value.length < 6) {
    messagePassword.value = "A senha deve ter no mínimo 6 caracteres.";
    return;
  }
  // Validação do nome se é menor que 3 caracteres
  if (name.value.length < 3) {
    messageName.value = "O nome deve ter no mínimo 3 caracteres.";
    return;
  }
  // Validação da senha se é diferente da senha digitada na confirmação
  if (password.value !== confirmPassword.value) {
    messagePassword.value = "As senhas não coincidem.";
    messageConfirmPassword.value = "As senhas não coincidem.";
    return;
  } else { // Caso passe todas as validações segue o registro para a API
    try {
      const response = await axios.post('http://localhost:5000/user/create', {
        name: name.value,
        email: email.value,
        password: password.value
      });

      message.value = { text: response.data.message, color: "green"};
      setTimeout(() => {
        router.replace('/')
      }, 2000);
    } catch (error) {
      console.error("Erro ao registrar:", error.response || error);
      message.value = { text: error.response.data.message, color: "red" }
    }

  };
}
</script>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.register-box {
  width: 320px;
  background: #ffffff;
  padding: 30px;
  border-radius: 4%;
  box-shadow: 0 2px 3px rgba(48, 48, 48, 0.30), 0 6px 10px rgba(48, 48, 48, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.register-box h2 {
  margin-bottom: 20px;
  color: #555;
}

.input-group {
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 5px;
  color: #555;
}

.input-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  transition: border 0.3s ease;
}

.input-group input:focus {
  border-color: #777;
}

.register-button {
  width: 100%;
  padding: 10px;
  background: #555;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.register-button:hover {
  background: #777;
  transform: scale(1.05);
}

span {
  font-size: 10px;
}
</style>