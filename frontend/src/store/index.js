import {createStore} from "vuex";
import {todoModule} from "@/store/todoModule";
import {authModule} from "@/store/authModule";

export default createStore({
    modules: {
        todo: todoModule,
        auth: authModule
    }
})