<template>
    <div class="login-container">
        <div class="login-box">
            <h2>Login</h2>
            <form @submit.prevent="login">
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="email" required />
                </div>
                <div class="input-group">
                    <label for="password">Senha</label>
                    <input type="password" id="password" v-model="password" required />
                </div>
                <button type="submit" class="login-button buttonDefault">Entrar</button>
            </form>
            <div class="options">
                Não possui uma conta? <RouterLink to="/register">Registre-se</RouterLink>
            </div>
            <span v-if="message.text" :style="{ color: message.color }" class="error">{{ message.text }}</span>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const email = ref('');
const password = ref('');
const message = ref('');

const login = async () => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`, {
            email: email.value,
            password: password.value
        });
        const { token, id, name, role } = response.data;

        localStorage.setItem("id", id);
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", name);
        localStorage.setItem("role", role);

        message.value = { text: response.data.message, color: "#22c55e" };
        setTimeout(() => {
            router.replace('/home')
        }, 2000);
    } catch (error) {
        message.value = { text: error.response.data.message, color: "#e74c3c" }
    }

};
</script>

<style scoped>
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: #f5f5f5;
}

.login-box {
    width: 320px;
    background: #ffffff;
    padding: 30px;
    border-radius: 4%;
    box-shadow: 0 2px 3px rgba(48, 48, 48, 0.30), 0 6px 10px rgba(48, 48, 48, 0.15);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.login-box h2 {
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

.login-button {
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

.login-button:hover {
    background: #17a589;
    transform: scale(1.05);
}

.options {
    display: flex;
    justify-content: start;
    font-size: 12px;
    padding: 10px 0 0 0;
}

.options a {
    padding-left: 2px;
    text-decoration: none;
    color: #555;
    transition: color 0.3s ease;
}

.options a:hover {
    color: #000;
}
</style>