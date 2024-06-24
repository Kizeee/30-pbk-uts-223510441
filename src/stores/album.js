// src/stores/album.js
import { defineStore } from "pinia";

export const useAlbumStore = defineStore("album", {
  state: () => ({
    albums: [],
    photos: [],
  }),
  actions: {
    async fetchAlbums() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/albums"
        );
        this.albums = await response.json();
      } catch (error) {
        console.error("Error fetching albums:", error);
      }
    },
    async fetchPhotos(albumId) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
        );
        this.photos = await response.json();
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    },
  },
});
