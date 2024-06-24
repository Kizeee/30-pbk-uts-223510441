<!-- src/components/Albums.vue -->
<template>
  <div class="album">
    <h2>Albums</h2>
    <ul>
      <li v-for="album in albums" :key="album.id">
        <router-link :to="{ name: 'Photos', params: { id: album.id } }">{{
          album.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useAlbumStore } from "../stores/album";

const albumStore = useAlbumStore();

onMounted(() => {
  console.log("Fetching albums...");
  albumStore.fetchAlbums();
});

const albums = computed(() => albumStore.albums);
</script>

<style scoped>
.album {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: #000000;
}

ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

li {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

p {
  margin: 10px 0 0;
  color: #555;
}
</style>
