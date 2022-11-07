import { createApp } from 'vue'
import App from "@/App";
import components from '@/components/UI';
import directives from "@/directives";
import router from "@/router/router";
import store from "@/store";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App)

components.forEach(component => {
    app.component(component.name, component)
})

directives.forEach(directive => {
    app.directive(directive.name, directive)
})

app
    .use(router)
    .use(store)
    .mount('#app');
