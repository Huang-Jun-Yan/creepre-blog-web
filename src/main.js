import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import installElementPlus from './plugins/element';
// 公共样式
import "./assets/css/resets.css";
import "./assets/css/icons.css";
import "./assets/js/remScale.js";

const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')