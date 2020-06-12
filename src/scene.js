import * as THREE from "https://cdn.jsdelivr.net/npm/three@v0.108.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@v0.108.0/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "./modules/STLLoader.js";
import { OBJLoader } from "./modules/OBJLoader.js";

// scene
var scene = new THREE.Scene();

// camera
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let multiplier = 10;
var camera = new THREE.OrthographicCamera(canvasWidth/-multiplier,canvasWidth/multiplier,canvasHeight/multiplier,canvasHeight/-multiplier,-50,50)

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor (0x444444, 1);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// controls
var controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.mouseButtons = {
	RIGHT: THREE.MOUSE.ROTATE
}

// textures & materials
const loadManager = new THREE.LoadingManager();
const loader = new THREE.TextureLoader(loadManager);

let faces = {
	black: new THREE.MeshPhongMaterial({color: 0x000000}),//{map: loader.load( "src/resources/textures/textures_black.png" )}),
	blue: new THREE.MeshPhongMaterial({color: 0x0000ff}),//{map: loader.load( "src/resources/textures/textures_blue.png" )}),
	green: new THREE.MeshPhongMaterial({color: 0x00ff00}),//{map: loader.load( "src/resources/textures/textures_green.png" )}),
	orange: new THREE.MeshPhongMaterial({color: 0xff5555}),//{map: loader.load( "src/resources/textures/textures_orange.png" )}),
	red: new THREE.MeshPhongMaterial({color: 0xff0000}),//{map: loader.load( "src/resources/textures/textures_red.png" )}),
	white: new THREE.MeshPhongMaterial({color: 0xffffff}),//{map: loader.load( "src/resources/textures/textures_white.png" )}),
	yellow: new THREE.MeshPhongMaterial({color: 0x00ffff})//{map: loader.load( "src/resources/textures/textures_yellow.png" )})
}

Object.keys(faces).forEach(mat => {
	// faces[mat].map.anisotropy = 16;
	faces[mat].shininess = 100;
	// faces[mat].color = 0x996633;
    // faces[mat].specular = 0x050505;
})

// grid positions
let xPos = [...Array(3).keys()];
let yPos = [...Array(3).keys()];
let zPos = [...Array(3).keys()];

// map faces to indices
let xNegColor = [faces.green, faces.black, faces.black]
let xPosColor = [faces.black, faces.black, faces.blue]
let yNegColor = [faces.orange, faces.black, faces.black]
let yPosColor = [faces.black, faces.black, faces.red]
let zNegColor = [faces.white, faces.black, faces.black]
let zPosColor = [faces.black, faces.black, faces.yellow]

// prepare geometry
let cubes = []
// var geometry = new THREE.BoxGeometry();
// var stlLoader = new STLLoader(loadManager);
var objLoader = new OBJLoader(loadManager);
// let geometry = stlLoader.load('src/resources/models/cube.stl')

objLoader.load( 'src/resources/models/cube.obj', function ( object ) {
	// var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200, wireframe: false } );
	// var mesh = new THREE.Mesh( geometry, material );
	// mesh.position.set( -1.5, -0.7, -0.7 );
	// //mesh.rotation.set( 0, - Math.PI / 2, 0 );
	// mesh.scale.set( 0.5, 0.5, 0.5 );
	// mesh.castShadow = true;
	// mesh.receiveShadow = true;
	// scene.add( mesh );

	console.log(object)

	// generate mesh and add to scene
	loadManager.onLoad = () => {

		var material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200, wireframe: false } );
		// var meshSTL = new THREE.Mesh( geometry, material );
		// meshSTL.position.set( -1.5, -0.7, -0.7 );
		// //meshSTL.rotation.set( 0, - Math.PI / 2, 0 );
		// meshSTL.scale.set( 0.5, 0.5, 0.5 );
		// meshSTL.castShadow = true;
		// meshSTL.receiveShadow = true;
		// scene.add( meshSTL );
		// console.log(meshSTL)

		// let matArray = [faces.green, faces.yellow, faces.white, faces.blue, faces.orange, faces.red]

		xPos.forEach(i => {
			yPos.forEach(j => {
				zPos.forEach(k => {

					// set face definition
					let matArray = [
						xPosColor[i],
						xNegColor[i],
						yPosColor[j],
						yNegColor[j],
						zPosColor[k],
						zNegColor[k]
					]

					let index = i*3+j*3+k
					let mesh = object.clone();
					mesh.traverse( function( child ) {
			            if ( child instanceof THREE.Mesh ) {
			                child.material = matArray[index%6];
			            }
			        } );
					// let mesh = new THREE.Mesh( geometry, faces.red); //matArray );
					let cube = {
						mesh: mesh,
						material: faces.blue,
						xPos: 19.05*(i-1),
						yPos: 19.05*(j-1),
						zPos: 19.05*(k-1),
						// color: colorArray[index],
						index: index
					}
					console.log(cube)
					cube.mesh.translateX(cube.xPos)
					cube.mesh.translateY(cube.yPos)
					cube.mesh.translateZ(cube.zPos)
					scene.add( cube.mesh );
				})
			})
		})
	}
} );


// lighting
var light = new THREE.PointLight( 0xffffff, 10, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );

var light = new THREE.PointLight( 0xffffff, 10, 100 );
light.position.set( -50, -50, -50 );
scene.add( light );

// finalize
camera.position.z = 5;
camera.position.x = 5;
camera.position.y = 2;

controls.update();

// animate
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}

// action!
animate();