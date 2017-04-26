import Vue from 'vue';

var app = new Vue({
    el: "#app",
    render: h=>h(require('./component/app/app.vue.html'))
});