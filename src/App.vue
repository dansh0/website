<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
    <!-- <v-container>
        <v-row>
            <Home/>
        </v-row>
        <v-row>
            <RubikScene/>
        </v-row>
    </v-container> -->
    <Home />
    <RubikScene />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Home from './components/Home.vue';
import RubikScene from './components/RubikScene.vue';

@Options({
    components: {
        Home,
        RubikScene
    },
})
export default class App extends Vue {}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0px;
    color: #ccc;
}
</style>
