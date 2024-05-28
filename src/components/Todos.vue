<template>
  <div>
    <h1>Daftar Kegiatan</h1>
    <div class="input-container">
      <input
        type="text"
        v-model="newActivity"
        placeholder="Tambahkan kegiatan baru..."
      />
      <button @click="addNewActivity">Tambah</button>
    </div>

    <ul>
      <li
        v-for="(activity, index) in filteredActivities"
        :key="index"
        class="activity-item"
      >
        <span
          v-if="index !== editingIndex"
          :class="{ completed: activity.completed }"
          >{{ activity.name }}</span
        >
        <input
          v-else
          type="text"
          v-model="editedActivityName"
          @keyup.enter="saveEdit"
          @keyup.esc="cancelEdit"
        />
        <div>
          <button
            @click="$emit('toggle-completion', index)"
            class="action-button"
          >
            {{ activity.completed ? "Batal Checklist" : "Checklist" }}
          </button>
          <button @click="editActivity(index)" class="action-button">
            {{ index === editingIndex ? "Simpan" : "Edit" }}
          </button>
          <button
            @click="$emit('remove-activity', index)"
            class="action-button"
          >
            Hapus
          </button>
        </div>
      </li>
    </ul>

    <div class="filter-container">
      <input
        type="checkbox"
        id="showOnlyPending"
        v-model="localShowOnlyPending"
      />
      <label for="showOnlyPending"
        >Tampilkan hanya kegiatan yang belum selesai</label
      >
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, computed, defineEmits, watch } from "vue";

const props = defineProps({
  activities: Array,
  showOnlyPending: Boolean,
});

const emit = defineEmits([
  "add-activity",
  "toggle-completion",
  "remove-activity",
  "edit-activity",
]);

const newActivity = ref("");
const editedActivityName = ref("");
const editingIndex = ref(-1);
const localShowOnlyPending = ref(props.showOnlyPending);

const addNewActivity = () => {
  if (newActivity.value.trim() !== "") {
    emit("add-activity", { name: newActivity.value, completed: false });
    newActivity.value = "";
  }
};

const editActivity = (index) => {
  editedActivityName.value = props.activities[index].name;
  editingIndex.value = index;
};

const saveEdit = () => {
  if (editedActivityName.value.trim() !== "") {
    emit("edit-activity", {
      index: editingIndex.value,
      newName: editedActivityName.value,
    });
    cancelEdit();
  }
};

const cancelEdit = () => {
  editedActivityName.value = "";
  editingIndex.value = -1;
};

const filteredActivities = computed(() => {
  if (localShowOnlyPending.value) {
    return props.activities.filter((activity) => !activity.completed);
  }
  return props.activities;
});

watch(localShowOnlyPending, (newValue) => {
  emit("update:showOnlyPending", newValue);
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
