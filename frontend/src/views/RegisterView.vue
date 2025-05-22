<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Crie a sua conta</h2>
      <form @submit.prevent="register">
        <div v-if="step == 1" key="step-1">
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
          <button type="button" @click="goToStep(2)" class="register-button buttonDefault">Próxima etapa</button>
        </div>
        <!-- Etapa 2: senha e foto -->
        <div v-else key="step-2">
          <!-- Upload de foto -->
          <FileUpload name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true"
            accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
              <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                <div class="flex gap-2">
                  <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined severity="secondary"></Button>
                  <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined
                    severity="success" :disabled="!files || files.length === 0"></Button>
                  <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger"
                    :disabled="!files || files.length === 0"></Button>
                </div>
                <ProgressBar :value="totalSizePercent" :showValue="false" class="md:w-20rem h-1 w-full md:ml-auto">
                  <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
                </ProgressBar>
              </div>
            </template>
            <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback, messages }">
              <div class="flex flex-col gap-8 pt-4">
                <Message v-for="message of messages" :key="message"
                  :class="{ 'mb-8': !files.length && !uploadedFiles.length }" severity="error">
                  {{ message }}
                </Message>

                <div v-if="files.length > 0">
                  <h5>Pending</h5>
                  <div class="flex flex-wrap gap-4">
                    <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                      class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                      <div>
                        <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                      </div>
                      <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name
                        }}</span>
                      <div>{{ formatSize(file.size) }}</div>
                      <Badge value="Pending" severity="warn" />
                      <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                        outlined rounded severity="danger" />
                    </div>
                  </div>
                </div>

                <div v-if="uploadedFiles.length > 0">
                  <h5>Completed</h5>
                  <div class="flex flex-wrap gap-4">
                    <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size"
                      class="p-8 rounded-border flex flex-col border border-surface items-center gap-4">
                      <div>
                        <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                      </div>
                      <span class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden">{{ file.name
                        }}</span>
                      <div>{{ formatSize(file.size) }}</div>
                      <Badge value="Completed" class="mt-4" severity="success" />
                      <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded
                        severity="danger" />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #empty>
              <div class="flex items-center justify-center flex-col">
                <i class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color" />
                <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
              </div>
            </template>
          </FileUpload>

          <div class="btnTable">
            <button type="button" @click="goToStep(1)" class="back-button buttonDefault">Voltar</button>
            <button type="submit" class="register-button buttonDefault">Cadastrar</button>
          </div>
        </div>
      </form>
      <span v-if="message.text" :style="{ color: message.color }">{{ message.text }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

import FileUpload from 'primevue/fileupload';

const step = ref(1)

// Campos do form
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const photo = ref(null);
const photoPreview = ref(null);

// Váriaveis de mensagem de erro e sucesso
const messagePassword = ref('');
const messageName = ref('');
const messageConfirmPassword = ref('');
const message = ref({ text: "", color: "" });

// Váriavel para adicionar o style nas mensagens de erro
const errorMessage = ref('red');

// Adiciona o router
const router = useRouter();

// Avançar no passo do form 
const goToStep = (n) => {
  if (n === 2 && (!name.value || !email.value)) {
    message.value = { text: 'Preencha todos os campos.', color: 'red' }
    return
  }
  message.value = { text: '', color: '' }
  step.value = n
}

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
        password: password.value,
        img: photo.value
      });

      message.value = { text: response.data.message, color: "green" };
      setTimeout(() => {
        router.replace('/');
      }, 2000);
    } catch (error) {
      console.error("Erro ao registrar:", error.response || error);
      message.value = { text: error.response.data.message, color: "red" }
    }

  };
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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

.photo-preview {
  display: flex;
  justify-content: center;
}

.btnTable {
  display: flex;
  gap: 10px;
}

.back-button {
  width: 100%;
}
</style>