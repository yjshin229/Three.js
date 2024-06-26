import * as THREE from "three";

const example = () => {
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
  });
  //setting renderer size to the browser size
  renderer.setSize(window.innerWidth, window.innerHeight);

  //add opacity to background
  // renderer.setClearAlpha(0.5);
  //add color to background
  // renderer.setClearColor("blue");

  const scene = new THREE.Scene();

  //adding color to the background to the scene.
  //ignores the renderer color. it goes on top of the renderer.
  scene.background = new THREE.Color("blue");

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

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };
  window.addEventListener("resize", setSize);
};

export default example;
