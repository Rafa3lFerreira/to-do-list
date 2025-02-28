<template>
    <div class="sidebar" id="sidebar">
        <h2>Menu</h2>
        <ul>
            <li>Home</li>
            <li>Sobre</li>
            <li>Serviços</li>
            <li>Contato</li>
        </ul>
    </div>
    <button class="toggle-btn" id="toggleBtn">☰</button>
</template>
<script>
const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleBtn");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
});
</script>
<style>
.sidebar {
    width: 250px;
    height: 100vh;
    background-color: #333;
    color: white;
    padding: 20px;
    position: fixed;
    left: -250px;
    transition: left 0.3s ease;
}

.sidebar.active {
    left: 0;
}

.toggle-btn {
    position: absolute;
    left: 250px;
    top: 20px;
    cursor: pointer;
    background-color: #ff9900;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    color: white;
}

.sidebar ul {
    list-style: none;
    margin-top: 20px;
}

.sidebar ul li {
    padding: 10px 0;
    cursor: pointer;
    transition: background 0.3s;
}

.sidebar ul li:hover {
    background: rgba(255, 255, 255, 0.2);
}
</style>