<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="hidden-sm-up">xs</div>
                <div class="hidden-xs-down hidden-md-up">sm</div>
                <div class="hidden-sm-down hidden-lg-up">md</div>
                <div class="hidden-md-down hidden-xl-up">lg</div>
                <div class="hidden-lg-down">xl</div>
            </div>
        </div>
        <div class="row showborder">
            <div class="col-xl-3">
                好不好好不好好不好好不好好不
            </div>
            <div class="col-xl-3">
                {{name}}
            </div>
            <div class="col-xl-3">
                789
            </div>
            <div class="col-xl-3">
                <!--<b-alert show>{{name}}</b-alert>-->
            </div>
        </div>
        <div class="media">
            <img class="d-flex mr-3" src="./../../images/logo.ico" alt="Generic placeholder image">
            <div class="media-body">
                <h5 class="mt-0">Media heading</h5> Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
            </div>
        </div>
    </div>
</template>

<style scoped>
div.title {
    color: blue;
}

.showborder div {
    border: 1px solid red;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class App extends Vue {
    name = "Hello, Vue is cool!!111";
}
</script>

