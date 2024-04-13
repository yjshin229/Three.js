import * as THREE from "three";

// const renderer = new THREE.WebGLRenderer();
// //set size of the canvas
// renderer.setSize(window.innerWidth, window.innerHeight);
// //append the cavas to the document.
// //or you can make the canvas in the html file.
// //
// document.body.appendChild(renderer.domElement);

//get by Id 써도 됨
const canvas = document.querySelector("#three-canvas");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
//setting renderer size to the browser size
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = 2;
camera.position.y = 3;
camera.position.z = 5;
scene.add(camera);

//BoxGeometry : the basic box
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: "red",
});

const mesh = new THREE.Mesh(geometry, material);
//needs to be added to the scene
scene.add(mesh);

//then finally needs to be rendered using the renderer.
//needs the scene and the camera
renderer.render(scene, camera);
