<template>
  <div>
      <input v-model="newTask" placeholder="Nova tarefa" />
      <button @click="addTask">Adicionar</button>
      <ul>
          <li v-for="task in tasks" :key="task._id">
              <span :class="{ completed: task.completed }">{{ task.title }}</span>
              <button @click="toggleTask(task)">✔</button>
              <button @click="deleteTask(task._id)">🗑</button>
          </li>
      </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
      return {
          tasks: [],
          newTask: "",
      };
  },
  methods: {
      async fetchTasks() {
          const res = await axios.get("http://localhost:5000/api/tasks");
          this.tasks = res.data;
      },
      async addTask() {
          if (!this.newTask) return;
          const res = await axios.post("http://localhost:5000/api/tasks", { title: this.newTask });
          this.tasks.push(res.data);
          this.newTask = "";
      },
      async toggleTask(task) {
          task.completed = !task.completed;
          await axios.put(`http://localhost:5000/api/tasks/${task._id}`, task);
      },
      async deleteTask(id) {
          await axios.delete(`http://localhost:5000/api/tasks/${id}`);
          this.tasks = this.tasks.filter(task => task._id !== id);
      },
  },
  mounted() {
      this.fetchTasks();
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
