import Greeting from "@/pages/Greeting.vue";
import Content from "@/pages/Content.vue";
import About from "@/pages/About.vue";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  { path: "/", component: Greeting },
  {
    path: "/content/:book",
    component: Content,
    props: true,
  },
  { path: "/about", component: About },
];

const router = new VueRouter({
  routes,
});

export default router;
