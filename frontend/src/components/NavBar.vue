<template>
    <nav class="navbar">
        <div class="logo">Minha Logo</div>
        <ul class="nav-links">
            <RouterLink to="/">Go to Home</RouterLink>
            <RouterLink to="/about">Go to About</RouterLink>
        </ul>
    </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    background-color: #333;
    color: white;
}

.logo {
    font-size: 20px;
    font-weight: bold;
}

.nav-links {
    list-style: none;
    display: flex;
    gap: 15px;
}

.nav-links li a {
    color: white;
    text-decoration: none;
}

.nav-links li a:hover {
    text-decoration: underline;
}
</style>