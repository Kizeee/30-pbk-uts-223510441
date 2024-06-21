// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Todos from "../components/Todos.vue";
import Posts from "../components/Posts.vue";
import Album from "../components/Album.vue";

const routes = [
  {
    path: "/",
    name: "Todos",
    component: Todos,
  },
  {
    path: "/posts",
    name: "Posts",
    component: Posts,
  },
  {
    path: "/album",
    name: "Album",
    component: Album,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
