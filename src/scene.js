import * as THREE from "https://cdn.jsdelivr.net/npm/three@v0.108.0/build/three.module.js";
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@v0.108.0/examples/jsm/controls/OrbitControls.js";

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new OrbitControls( camera, renderer.domElement );



renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry();

let xPos = [...Array(3).keys()];
let yPos = [...Array(3).keys()];
let zPos = [...Array(3).keys()];

var colorArray = ['#CC80CC', 
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

console.log(xPos)
let cubes = []

xPos.forEach(i => {
	yPos.forEach(j => {
		zPos.forEach(k => {
			let index = i*3+j*3+k
			let material = new THREE.MeshPhongMaterial({
		      color: colorArray[index],    // red (can also use a CSS color string here)
		      flatShading: false,
		    });

			let mesh = new THREE.Mesh( geometry, material );
			let cube = {
				mesh: mesh,
				material: material,
				xPos: 1.05*(i-1),
				yPos: 1.05*(j-1),
				zPos: 1.05*(k-1),
				color: colorArray[index],
				index: index
			}
			cube.mesh.translateX(cube.xPos)
			cube.mesh.translateY(cube.yPos)
			cube.mesh.translateZ(cube.zPos)
			scene.add( cube.mesh );
		})
	})
})

var light = new THREE.PointLight( 0xffffff, 10, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

camera.position.z = 5;

controls.update();

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}
animate();