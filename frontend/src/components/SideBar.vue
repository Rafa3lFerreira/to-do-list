<template>
  <div class="sidebar">
    <RouterLink to="/home">
      <div class="item">
        <font-awesome-icon :icon="['fas', 'house']" />
        <span class="tooltip">Home</span>
      </div>
    </RouterLink>
    <RouterLink to="/dev">
      <div class="item">
        <font-awesome-icon :icon="['fas', 'registered']" />
        <span class="tooltip">User register</span>
      </div>
    </RouterLink>
    <RouterLink to="/crud">
      <div class="item">
        <font-awesome-icon :icon="['fas', 'user']" />
        <span class="tooltip">Crud</span>
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

.tooltip {
  visibility: hidden;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 5px 8px;
  border-radius: 4px;
  position: absolute;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s;
}

.sidebar .item:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
