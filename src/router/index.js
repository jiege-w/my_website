import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("../views/Cart.vue"),
    },
    {
      path: "/Chat",
      name: "Chat",
      component: () => import("../views/Chat.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("../views/Order.vue"),
    },
    {
      path: "/shopping",
      name: "shopping",
      component: () => import("../views/Shopping.vue"),
    },
  ],
});

export default router;
