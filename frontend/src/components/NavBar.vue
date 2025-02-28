<template>
  <nav class="navbar">
    <div class="logo">Minha Logo</div>
    <ul class="nav-links">
      <RouterLink to='/register'>Home</RouterLink>
      <RouterLink to='/crud'>Sobre</RouterLink>
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
  color: #202123;
  width: 100%;
}

.nav-links {
  color: white;
  text-decoration: none;
}

.nav-links :hover {
  text-decoration: underline;
}
</style>
