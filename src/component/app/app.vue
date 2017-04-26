<template>
    <div class="title">
        {{name}}
    </div>
</template>

<style scoped>
div.title {
    color: red;
}
</style>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class App extends Vue {
    name = "Hello, Vue.";
}
</script>

