<!-- src/components/Todos.vue -->
<template>
  <div class="todos">
    <h2>Todos</h2>
    <div class="input-container">
      <input v-model="newActivity" placeholder="Add new activity" />
      <button @click="addNewActivity">Add Activity</button>
    </div>
    <ul>
      <li
        v-for="(activity, index) in filteredActivities"
        :key="index"
        :class="{ completed: activity.completed }"
      >
        {{ activity.name }}
        <button @click="toggleCompletion(index)">Checklist</button>
        <button @click="removeActivity(index)">Remove</button>
        <button @click="editActivity(index)">Edit</button>
      </li>
    </ul>
    <div class="filter-container">
      <label>
        <input
          type="checkbox"
          :checked="showOnlyPending"
          @change="updateShowOnlyPending"
        />
        Show Only Pending
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    activities: Array,
    showOnlyPending: Boolean,
  },
  data() {
    return {
      newActivity: "",
    };
  },
  computed: {
    filteredActivities() {
      return this.showOnlyPending
        ? this.activities.filter((activity) => !activity.completed)
        : this.activities;
    },
  },
  methods: {
    addNewActivity() {
      if (this.newActivity.trim()) {
        this.$emit("add-activity", {
          name: this.newActivity,
          completed: false,
        });
        this.newActivity = "";
      }
    },
    toggleCompletion(index) {
      this.$emit("toggle-completion", index);
    },
    removeActivity(index) {
      this.$emit("remove-activity", index);
    },
    editActivity(index) {
      const newName = prompt(
        "Edit activity name:",
        this.activities[index].name
      );
      if (newName !== null && newName.trim()) {
        this.$emit("edit-activity", { index, newName });
      }
    },
    updateShowOnlyPending(event) {
      this.$emit("update:showOnlyPending", event.target.checked);
    },
  },
};
</script>

<style scoped>
.todos {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #000000;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.input-container input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-container button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.input-container button:hover {
  background-color: #0056b3;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

li:last-child {
  border-bottom: none;
}

.completed {
  text-decoration: line-through;
  color: #777;
}

.filter-container {
  margin-top: 20px;
}

.filter-container label {
  color: #444;
}
</style>
