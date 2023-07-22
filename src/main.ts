import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import LoadingAnimation from './components/UI/LoadingAnimation.vue'


let app = createApp(App);
app
    .use(store)
    .use(router)
    .component(LoadingAnimation.name, LoadingAnimation)
    .mount('#app')