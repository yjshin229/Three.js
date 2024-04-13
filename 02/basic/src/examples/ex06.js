import * as THREE from "three";

const example = () => {
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
  camera.position.z = 5;
  scene.add(camera);

  const light = new THREE.DirectionalLight(0xffffffff, 1);
  light.position.z = 2;
  //ALWAYS ADD THINGS TO THE SCENE!!
  scene.add(light);

  //BoxGeometry : the basic box
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  //MeshBasicMaterial : doesnt change according to the light. can be shown without light
  const material = new THREE.MeshStandardMaterial({
    color: "red",
  });

  const mesh = new THREE.Mesh(geometry, material);
  //needs to be added to the scene
  scene.add(mesh);

  //then finally needs to be rendered using the renderer.
  //needs the scene and the camera
  renderer.render(scene, camera);

  const clock = new THREE.Clock();

  const draw = () => {
    //gives the difference of the time.
    //don't use getElapsedTime and getDelta at the same time!! -> 뭔가 꼬임
    const time = clock.getDelta();
    mesh.rotation.y += time;
    renderer.render(scene, camera);

    //repeat requestAnimationFrame
    window.requestAnimationFrame(draw);
  };

  const setSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };
  window.addEventListener("resize", setSize);
  draw();
};

export default example;
