/* 3D RK logo (needs js/vendor/three.min.js) */
(function () {
  var nodes = document.querySelectorAll('[data-rk]');
  if (!nodes.length || !window.THREE) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Builds the letters R and K from boxes and one extruded bowl, centred on the origin.
  function buildRK() {
    var g = new THREE.Group();
    var D = 0.5;
    var mat = new THREE.MeshStandardMaterial({ color: 0x8b2036, metalness: 0.2, roughness: 0.4 });
    function box(w, h, x, y, rot) {
      var m = new THREE.Mesh(new THREE.BoxGeometry(w, h, D), mat);
      m.position.set(x, y, 0);
      m.rotation.z = rot || 0;
      g.add(m);
    }
    // R: stem, bowl, leg
    box(0.55, 3, 0.275, 1.5);
    var bowl = new THREE.Shape();
    bowl.moveTo(0.3, 1.2);
    bowl.lineTo(1.2, 1.2);
    bowl.absarc(1.2, 2.1, 0.9, -Math.PI / 2, Math.PI / 2, false);
    bowl.lineTo(0.3, 3);
    bowl.lineTo(0.3, 1.2);
    var hole = new THREE.Path();
    hole.moveTo(0.55, 1.7);
    hole.lineTo(1.2, 1.7);
    hole.absarc(1.2, 2.1, 0.4, -Math.PI / 2, Math.PI / 2, false);
    hole.lineTo(0.55, 2.5);
    hole.lineTo(0.55, 1.7);
    bowl.holes.push(hole);
    var bowlMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(bowl, { depth: D, bevelEnabled: false, curveSegments: 32 }), mat);
    bowlMesh.position.z = -D / 2;
    g.add(bowlMesh);
    box(1.7, 0.5, 1.65, 0.65, -0.868);
    // K: stem, upper arm, lower leg
    box(0.55, 3, 3.275, 1.5);
    box(2.23, 0.5, 4.375, 2.25, 0.737);
    box(2.2, 0.5, 4.6, 0.85, -0.885);
    var centre = new THREE.Box3().setFromObject(g).getCenter(new THREE.Vector3());
    g.position.sub(centre);
    var pivot = new THREE.Group();
    pivot.add(g);
    return pivot;
  }

  nodes.forEach(function (el) {
    var renderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch (e) { return; }
    var w = el.clientWidth || 100, h = el.clientHeight || 100;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
    camera.position.set(0, 0, 10.3);
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    var key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(4, 6, 8);
    scene.add(key);
    var rim = new THREE.PointLight(0xffffff, 0.5);
    rim.position.set(-6, -3, 6);
    scene.add(rim);
    var pivot = buildRK();
    scene.add(pivot);
    while (el.firstChild) { el.removeChild(el.firstChild); }
    el.appendChild(renderer.domElement);

    if ('ResizeObserver' in window) {
      new ResizeObserver(function () {
        var nw = el.clientWidth, nh = el.clientHeight;
        if (!nw || !nh) return;
        renderer.setSize(nw, nh, false);
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
      }).observe(el);
    }
    var visible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; }).observe(el);
    }
    var start = performance.now();
    function frame(now) {
      requestAnimationFrame(frame);
      if (!visible) return;
      var t = (now - start) / 1000;
      pivot.rotation.y = reduce ? -0.35 : Math.sin(t * 0.8) * 0.6;
      pivot.rotation.x = reduce ? 0.1 : Math.sin(t * 0.5) * 0.12;
      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  });
})();
