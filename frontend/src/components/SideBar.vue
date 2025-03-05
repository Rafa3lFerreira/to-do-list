<template>
  <div class="sidebar">
    <RouterLink to="/">
      <div class="item">
        <font-awesome-icon :icon="['fas', 'house']" />
      </div>
    </RouterLink>
    <RouterLink to="/register">
      <div class="item">
        <font-awesome-icon :icon="['fas', 'registered']" />
      </div>
    </RouterLink>
    <RouterLink to="/crud">
      <div class="item">
        <font-awesome-icon :icon="['fas', 'user']" />
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
</script>

<style scoped>
.sidebar {
  width: 120px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;
  padding-top: 20px;
  border-radius: 4%;
  box-shadow: 0 2px 3px 0 rgba(48, 48, 48, .30), 0 6px 10px 4px rgba(48, 48, 48, .15);

}

.sidebar .item {
  width: 60px;
  height: 60px;
  background: #555;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: transform 0.3s ease, background 0.3s ease;
  cursor: pointer;
}

.sidebar .item:hover {
  transform: scale(1.1);
  background: #777;
}

.sidebar .item i {
  color: white;
  font-size: 24px;
}
</style>
