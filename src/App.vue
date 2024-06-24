<!-- src/App.vue -->
<template>
  <div id="app">
    <Header />
    <div class="content">
      <router-view
        :activities="activities"
        :showOnlyPending.sync="showOnlyPending"
        @add-activity="addActivity"
        @toggle-completion="toggleCompletion"
        @remove-activity="removeActivity"
        @edit-activity="editActivity"
        :users="users"
        :selected-user="selectedUser"
        :posts="posts"
        @select-user="selectUser"
      />
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  components: {
    Header,
  },
  data() {
    return {
      activities: [],
      showOnlyPending: false,
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
        console.log("Fetching users...");
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const data = await response.json();
        this.users = data;
        console.log("Users fetched:", this.users);
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
      this.selectedUser = userId.toString(); // Ensure the selected user ID is a string
      this.fetchPosts(this.selectedUser);
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f9;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.content {
  margin-top: 20px;
}

h1 {
  text-align: center;
  color: #444;
}
</style>
