import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import VueLodash from 'vue-lodash'
import 'element-ui/lib/theme-chalk/index.css';


//自定义样式
import './style/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'mini' });
Vue.use(VueLodash)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')