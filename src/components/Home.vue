<template>
    <div class="container">
        <div class="textContainer">
            <div>Welcome! My website is in progress</div>
            <div>Play with this Rubik's Cube for now</div> 
            <div>Rotate it with right mouse click</div>
            <div>Zoom with scroll wheel</div>
        </div>
    </div>
</template>

<script lang="ts">
// import { Options, Vue } from 'vue-class-component';
import { Vue } from 'vue-class-component';


// @Options({
//   props: {
//     msg: String
//   }
// })
export default class Home extends Vue {
    msg!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #08f;
}
.container {
    display: flex;
    justify-content: center;
}

.textContainer {
    height: 100%;
    margin-right: 0 auto;
    margin-left: 0 auto;
    margin-top: 10px;
    margin-bottom: 20px;
    /*display: flex;
    justify-content: center;*/
    text-align: center;
    /*flex-direction: column;*/
}
</style>
