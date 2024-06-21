<template>
  <div class="album">
    <h2>Album</h2>
    <ul>
      <li v-for="photo in photos" :key="photo.id">
        <img :src="photo.thumbnailUrl" :alt="photo.title" />
        <p>{{ photo.title }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photos: [],
    };
  },
  async created() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/photos?albumId=1"
      );
      const data = await response.json();
      this.photos = data;
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  },
};
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
