<!-- src/components/Post.vue -->
<template>
  <div>
    <h1>Postingan</h1>
    <select v-model="localSelectedUser" @change="selectUser">
      <option value="">Pilih pengguna</option>
      <option v-for="user in users" :key="user.id" :value="user.id.toString()">
        {{ user.name }}
      </option>
    </select>
    <ul v-if="localSelectedUser">
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, ref, watch, onMounted } from "vue";

const props = defineProps({
  users: Array,
  selectedUser: String, // Expecting a string
  posts: Array,
});

const emit = defineEmits(["select-user"]);

const localSelectedUser = ref(props.selectedUser);

const selectUser = (event) => {
  emit("select-user", event.target.value);
};

watch(localSelectedUser, (newValue) => {
  emit("select-user", newValue);
});

onMounted(() => {
  console.log("Users prop:", props.users);
});
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #000002;
}

.input-container {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.input-container input {
  padding: 8px;
  font-size: 16px;
  margin-bottom: 10px;
}

.input-container button {
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.activity-item:last-child {
  border-bottom: none;
}

.completed {
  text-decoration: line-through;
  color: #777;
}

.filter-container {
  margin-top: 20px;
}

.action-button {
  padding: 6px 12px;
  margin-left: 5px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
}

.action-button:hover {
  background-color: #555;
}
</style>
