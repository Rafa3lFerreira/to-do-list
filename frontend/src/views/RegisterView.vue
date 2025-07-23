<template>
  <div class="register-container">
    <div class="register-box">
      <button class="back-to-login-btn" @click="goToLogin">←</button>
      <h2>Crie a sua conta</h2>
      <p class="step-indicator">Etapa {{ step }} de 3</p>
      <form @submit.prevent="register">
        <div v-if="step == 1" key="step-1">
          <div class="input-group">
            <label for="nome">Name</label>
            <InputText type="text" v-model="name" id="name" />
            <span class="error">{{ messageName }}</span>
          </div>
          <div class="input-group">
            <label for="email">E-mail</label>
            <InputText type="email" v-model="email" id="email" />
            <span class="error">{{ messageEmail }}</span>
          </div>
          <button type="button" @click="goToStep(2)" class="register-button buttonDefault">Próxima etapa</button>
        </div>
        <div v-else-if="step == 2" key="step-2">
          <div class="input-group">
            <label for="email">Password</label>
            <Password v-model="password" toggleMask />
            <span class="error">{{ messagePassword }}</span>
          </div>
          <div class="input-group">
            <label for="confirmPassword">Confirm password</label>
            <Password v-model="confirmPassword" :feedback="false" toggleMask />
            <span class="error">{{ messageConfirmPassword }}</span>
          </div>

          <div class="btnTable">
            <button type="button" @click="goToStep(1)" class="back-button buttonDefault">Voltar</button>
            <button type="button" @click="goToStep(3)" class="register-button buttonDefault">Próxima etapa</button>
          </div>
        </div>
        <!-- Etapa 2: senha e foto -->
        <div v-else key="step-3" class="preview-step">
          <!-- Upload de foto -->

          <p>Está em manutenção</p>
          <div class="btnTable">
            <button type="button" @click="goToStep(2)" class="back-button buttonDefault">Voltar</button>
            <button type="submit" class="register-button buttonDefault">Cadastrar</button>
          </div>
        </div>
      </form>
      <span v-if="message.text" :style="{ color: message.color }" class="error">{{ message.text }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';

const step = ref(1)

// Campos do form
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const photo = ref(null);

// Váriaveis de mensagem de erro
const message = ref('');
const messageName = ref('');
const messageEmail = ref('');
const messagePassword = ref('');
const messageConfirmPassword = ref('');

// Regex pra email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Adiciona o router
const router = useRouter();

// Back to login screen 
const goToLogin = () => {
  router.replace('/');
}

// Avançar no passo do form 
const goToStep = (n) => {
  messageEmail.value = '';
  messagePassword.value = '';
  messageName.value = '';
  messageConfirmPassword.value = '';

  if (step.value === 1 && n === 2) {
    if (!name.value.trim()) {
      messageName.value = 'O nome é obrigatório.'
      return
    }

    if (!email.value.trim()) {
      messageEmail.value = 'O e-mail é obrigatório.'
      return
    }

    if (!emailRegex.test(email.value)) {
      messageEmail.value = 'Formato de e-mail inválido.'
      return
    }

    step.value = n
  }

  if (step.value === 2 && n === 3) {
    if (password.value.length < 6) {
      messagePassword.value = 'A senha deve mais de 5 caracteres.'
      return
    }

    if (password.value !== confirmPassword.value) {
      messageConfirmPassword.value = 'As senhas não coincidem.'
      return
    }
    step.value = n
  }

  step.value = n;
}

const register = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/create`, {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    message.value = { text: response.data.message, color: "#22c55e" };
    setTimeout(() => {
      router.replace('/');
    }, 2000);
  } catch (error) {
    message.value = { text: error.response.data.message, color: "#e74c3c" }
  }

};

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
  margin-bottom: 10px;
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

.register-button {
  width: 100%;
  padding: 10px;
  background: #20C997;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.register-button:hover {
  background: #17a589;
  transform: scale(1.05);
}

span {
  font-size: 10px;
}

.btnTable {
  display: flex;
  gap: 10px;
}

.back-button {
  width: 100%;
}

.back-to-login-btn {
  align-self: flex-start;
  background: none;
  border: none;
  font-size: 16px;
  color: #555;
  cursor: pointer;
  transition: color 0.3s;
}

.back-to-login-btn:hover {
  color: #000;
}

.step-indicator {
  font-size: 14px;
  color: #555;
  text-align: center;
}

.error {
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 4px;
  display: block;
  font-weight: 600;
}
</style>