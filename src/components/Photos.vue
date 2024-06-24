<!-- src/components/Photos.vue -->
<template>
  <div class="photos">
    <h1>Photos</h1>
    <ul class="photo-list">
      <li v-for="photo in photos" :key="photo.id" @click="viewPhoto(photo)">
        <img :src="photo.thumbnailUrl" :alt="photo.title" />
        <p>{{ photo.title }}</p>
      </li>
    </ul>
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <img
            :src="selectedPhoto.url"
            :alt="selectedPhoto.title"
            class="full-size-photo"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useAlbumStore } from "../stores/album";
import { useRoute } from "vue-router";
import { QDialog, QCard, QCardSection } from "quasar";

const albumStore = useAlbumStore();
const route = useRoute();

const dialog = ref(false);
const selectedPhoto = ref({});

const viewPhoto = (photo) => {
  selectedPhoto.value = photo;
  dialog.value = true;
};

const photos = computed(() => albumStore.photos);

onMounted(() => {
  console.log("Fetching photos for album:", route.params.id);
  albumStore.fetchPhotos(route.params.id);
  console.log("Photos fetched:", albumStore.photos);
});
</script>

<style scoped>
.photos {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  color: #000;
  text-align: center;
}

.photo-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.photo-list li {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.photo-list li:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.photo-list img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.photo-list p {
  margin: 10px 0 0;
  color: #555;
}

.full-size-photo {
  width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
