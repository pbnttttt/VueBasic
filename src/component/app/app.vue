<template>
    <div>
        <div class="title">
            {{name}}
        </div>
        <b-alert show>{{name}}</b-alert>
    </div>
</template>

<style scoped>
div.title {
    color: blue;
}
</style>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class App extends Vue {
    name = "Hello, Vue is cool!!";
}
</script>

