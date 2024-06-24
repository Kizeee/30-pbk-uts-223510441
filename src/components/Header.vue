<!-- src/components/Header.vue -->
<template>
  <header>
    <router-link to="/">Todos</router-link>
    <router-link to="/posts">Posts</router-link>
    <router-link to="/albums">Albums</router-link>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 10px 0;
  background-color: #000000;
  border-radius: 8px;
}

router-link {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

router-link:hover {
  background-color: #444;
}

router-link.active {
  background-color: #555;
}
</style>
