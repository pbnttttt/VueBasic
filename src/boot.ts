import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

var app = new Vue({
    el: "#app",
    render: h=>h(require('./component/app/app.vue'))
});