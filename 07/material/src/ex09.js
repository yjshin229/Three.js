import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ----- Texture Image Load

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
  const rightTexture = textureLoader.load("/textures/mcstyle/right.png");
  const leftTexture = textureLoader.load("/textures/mcstyle/left.png");
  const topTexture = textureLoader.load("/textures/mcstyle/top.png");
  const bottomTexture = textureLoader.load("/textures/mcstyle/bottom.png");
  const frontTexture = textureLoader.load("/textures/mcstyle/front.png");
  const backTexture = textureLoader.load("/textures/mcstyle/back.png");

  const materials = [
    new THREE.MeshBasicMaterial({ map: rightTexture }),
    new THREE.MeshBasicMaterial({ map: leftTexture }),
    new THREE.MeshBasicMaterial({ map: topTexture }),
    new THREE.MeshBasicMaterial({ map: bottomTexture }),
    new THREE.MeshBasicMaterial({ map: frontTexture }),
    new THREE.MeshBasicMaterial({ map: backTexture }),
  ];

  //makes the texture clear when the texture is too small.
  rightTexture.magFilter = THREE.NearestFilter;
  leftTexture.magFilter = THREE.NearestFilter;
  topTexture.magFilter = THREE.NearestFilter;
  bottomTexture.magFilter = THREE.NearestFilter;
  frontTexture.magFilter = THREE.NearestFilter;
  backTexture.magFilter = THREE.NearestFilter;

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
  const material = new THREE.MeshBasicMaterial({
    map: topTexture,
  });

  const mesh = new THREE.Mesh(geometry, materials);
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
