import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- Texture modify

export default function example() {
  //Texture Image load

  const loadingManager = new THREE.LoadingManager();
  loadingManager.onStart = () => {
    console.log("start ");
  };
  loadingManager.onProgress = () => {
    console.log("onProgress");
  };
  loadingManager.onLoad = () => {
    console.log("loading");
  };
  loadingManager.onError = () => {
    console.log("error");
  };
  const textureLoader = new THREE.TextureLoader(loadingManager);

  const textureBase = textureLoader.load(
    "/textures/skull/Ground Skull_basecolor.jpg"
  );

  //texture modify
  //repeats the texture and fills in in x
  textureBase.wrapS = THREE.RepeatWrapping;
  //   textureBase.offset.x = 0.3;

  //repeats the texture and fills in in y
  textureBase.wrapT = THREE.RepeatWrapping;
  //   textureBase.offset.y = 0.3;

  //   //repeats texture like tiles
  //   textureBase.repeat.x = 2;

  textureBase.rotation = THREE.MathUtils.degToRad(30);

  //sets the center for the texture.
  textureBase.center.x = 0.5;
  textureBase.center.y = 0.5;

  // Renderer
  const canvas = document.querySelector("#three-canvas");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight("white", 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight("white", 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls

  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  //No highlight, no reflection
  const materialLambert = new THREE.MeshBasicMaterial({
    map: textureBase,
  });

  const mesh = new THREE.Mesh(geometry, materialLambert);
  scene.add(mesh);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener("resize", setSize);

  draw();
}
