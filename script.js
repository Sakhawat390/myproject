document.addEventListener("DOMContentLoaded", () => {

  /* ============================= */
  /* Smooth Scroll */
  /* ============================= */
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      document.querySelector(link.getAttribute("href"))
        .scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ============================= */
  /* GSAP Animations */
  /* ============================= */
  gsap.registerPlugin(ScrollTrigger);

  // Hero animation
  gsap.from(".hero-title", {
    opacity: 0,
    y: 50,
    duration: 1.2,
    ease: "power3.out"
  });

  gsap.from(".hero-roles p", {
    opacity: 0,
    y: 25,
    stagger: 0.2,
    duration: 1,
    delay: 0.5
  });

  gsap.from(".btn", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 1.2
  });

  // Gallery cards animation
  gsap.from(".work-card", {
    scrollTrigger: {
      trigger: ".gallery-grid",
      start: "top 80%",
    },
    opacity: 0,
    y: 60,
    stagger: 0.25,
    duration: 1.2
  });


  /* ============================= */
  /* THREE.JS BACKGROUND OBJECT */
  /* ============================= */
  const canvas = document.getElementById("three-canvas");

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true
  });

  renderer.setSize(window.innerWidth, window.innerHeight);

  // Geometry Object
  const geometry = new THREE.TorusKnotGeometry(0.8, 0.3, 120, 16);
  const material = new THREE.MeshBasicMaterial({
    color: "#00d4ff",
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });

  const knot = new THREE.Mesh(geometry, material);
  scene.add(knot);

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    knot.rotation.x += 0.003;
    knot.rotation.y += 0.004;

    renderer.render(scene, camera);
  }

  animate();

  // Resize Fix
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

});
