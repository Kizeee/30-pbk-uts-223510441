// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Todos from "../components/Todos.vue";
import Posts from "../components/Posts.vue";
import Albums from "../components/Albums.vue";
import Photos from "../components/Photos.vue";

const routes = [
  { path: "/", name: "Todos", component: Todos },
  { path: "/posts", name: "Posts", component: Posts },
  { path: "/albums", name: "Albums", component: Albums },
  { path: "/albums/:id", name: "Photos", component: Photos, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
