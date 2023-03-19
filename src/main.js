import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import router from "./router";
import "./assets/main.css";
import 'element-plus/theme-chalk/index.css'
const app = createApp(App);
app.use(router);
app.use(ElementPlus, { size: "small", zIndex: 3000 });
app.mount("#app");
