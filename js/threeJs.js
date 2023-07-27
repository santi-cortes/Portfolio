import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const light = new THREE.HemisphereLight(0xffffff, 0x080809, 1);
light.position.set(1, 1, 1);
scene.add(light);
scene.background = null;
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(400, 400);
const canvasContainer = document.getElementById('canvas-container');
canvasContainer.appendChild(renderer.domElement);

camera.position.z = 10.5;
camera.position.y = 2;

let model;

loader.load(
	'./js/dog.glb',
	function (gltf) {
		model = gltf.scene;
		scene.add(model);
	},
	undefined,
	function (error) {
		console.log(error);
	}
);

function animateLoop() {
	requestAnimationFrame(animateLoop);
	if (model) {
		model.rotation.y += 0.005;
	}
	renderer.render(scene, camera);
}

animateLoop();
