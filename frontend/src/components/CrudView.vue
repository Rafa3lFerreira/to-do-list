<template>
    <div class="contentTitle">
        <h1>To do list</h1>
        <div class="mainContent">
            <div class="btnTable">
                <button @click="registerNew">
                   Register
                </button>
                <button>
                    Filtro
                </button>
            </div>
            <table>
                <thead>
                    <td>
                    </td>
                </thead>
                <tbody>
                    <td>
                    </td>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

</script>

<style>
.btnTable {
    display: flex;
    justify-content: flex-end;
}
h1 {
    padding: 5px 0 5px 0;
}
</style>