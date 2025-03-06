<template>
    <nav class="navbar">
        <div class="user-info">
            <span class="user-name">Nome do Usuário</span>
            <div class="user-icon">
                <font-awesome-icon :icon="['fas', 'user']" />
            </div>
        </div>
    </nav>
</template>

<script setup>
// Aqui você pode importar e usar dados reais do usuário se necessário
</script>

<style scoped>
.navbar {
    width: 100%;
    background: #ffffff;
    box-shadow: 0 2px 3px 0 rgba(48, 48, 48, 0.30), 0 6px 10px 0px rgba(48, 48, 48, 0.15);
    border-radius: 4%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.user-info {
    display: flex;
    align-items: center;
}

.user-name {
    margin-right: 10px;
    font-size: 16px;
    color: #555;
}

.user-icon {
    width: 40px;
    height: 40px;
    background: #555;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: transform 0.3s ease, background 0.3s ease;
    cursor: pointer;
}

.user-icon:hover {
    transform: scale(1.1);
    background: #777;
}

.user-icon svg {
    color: white;
    font-size: 18px;
}
</style>