<template>
  <div id="app">
    <Header @toggle-view="toggleView" />
    <Todos
      v-if="!showingPosts"
      :activities="activities"
      :showOnlyPending="showOnlyPending"
      @add-activity="addActivity"
      @toggle-completion="toggleCompletion"
      @remove-activity="removeActivity"
      @edit-activity="editActivity"
    />
    <Posts
      v-else
      :users="users"
      :selectedUser="selectedUser"
      :posts="posts"
      @select-user="selectUser"
    />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Todos from "./components/Todos.vue";
import Posts from "./components/Posts.vue";

export default {
  components: {
    Header,
    Todos,
    Posts,
  },
  data() {
    return {
      activities: [],
      showOnlyPending: false,
      showingPosts: false,
      selectedUser: null,
      users: [],
      posts: [],
    };
  },
  methods: {
    addActivity(newActivity) {
      this.activities.push(newActivity);
    },
    toggleCompletion(index) {
      this.activities[index].completed = !this.activities[index].completed;
    },
    removeActivity(index) {
      this.activities.splice(index, 1);
    },
    editActivity({ index, newName }) {
      this.activities[index].name = newName;
    },
    async fetchUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        this.users = data;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async fetchPosts(userId) {
      if (!userId) return;
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    selectUser(userId) {
      this.selectedUser = userId;
      this.fetchPosts(userId);
    },
    toggleView(view) {
      this.showingPosts = view === "post";
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
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
