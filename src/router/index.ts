import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";

const routes = [
    {
        path: "/",
        component: Main
    }
];

const router = createRouter({
    routes,
    history: createWebHistory()
});

export default router;

