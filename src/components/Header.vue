<template>
  <div>
    <h1>
      Jadwal Kegiatan! <br />
      Pilih Kegiatan
    </h1>
    <div class="filters">
      <button @click="$emit('toggle-view', 'todo')" class="button-74">
        To-Do list
      </button>
      <button @click="$emit('toggle-view', 'post')" class="button-74">
        Tampilkan Postingan
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["toggle-view"]);
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
  color: #cccddb;
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
