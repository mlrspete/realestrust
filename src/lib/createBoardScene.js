import * as THREE from "three";

const BOARD_PLANE_WIDTH = 3.78;
const CAMERA_FOV = 25;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 20;

function createRoundedRectShape(width, height, radius) {
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  const shape = new THREE.Shape();
  shape.moveTo(-halfWidth + radius, -halfHeight);
  shape.lineTo(halfWidth - radius, -halfHeight);
  shape.quadraticCurveTo(halfWidth, -halfHeight, halfWidth, -halfHeight + radius);
  shape.lineTo(halfWidth, halfHeight - radius);
  shape.quadraticCurveTo(halfWidth, halfHeight, halfWidth - radius, halfHeight);
  shape.lineTo(-halfWidth + radius, halfHeight);
  shape.quadraticCurveTo(-halfWidth, halfHeight, -halfWidth, halfHeight - radius);
  shape.lineTo(-halfWidth, -halfHeight + radius);
  shape.quadraticCurveTo(-halfWidth, -halfHeight, -halfWidth + radius, -halfHeight);
  shape.closePath();

  return shape;
}

function getBoardPlaneSize(boardSize) {
  const aspectRatio = boardSize.width / boardSize.height;

  return {
    width: BOARD_PLANE_WIDTH,
    height: BOARD_PLANE_WIDTH / aspectRatio,
  };
}

function toScenePoint(targetItem, boardSize, planeSize) {
  const centerX = targetItem.x + targetItem.width / 2;
  const centerY = targetItem.y + targetItem.height / 2;

  const normalizedX = centerX / boardSize.width - 0.5;
  const normalizedY = 0.5 - centerY / boardSize.height;

  return new THREE.Vector3(
    normalizedX * planeSize.width,
    normalizedY * planeSize.height,
    0,
  );
}

function disposeMaterial(material) {
  if (Array.isArray(material)) {
    material.forEach(disposeMaterial);
    return;
  }

  material?.dispose?.();
}

function registerMesh(cleanupFns, mesh) {
  cleanupFns.push(() => {
    mesh.geometry?.dispose?.();
    disposeMaterial(mesh.material);
  });
}

function createRenderer(canvas, exposure) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = exposure;
  renderer.setClearColor(0x000000, 0);

  return renderer;
}

function addSharedLights(scene, options = {}) {
  const {
    ambientIntensity = 0.46,
    hemiIntensity = 0.54,
    keyIntensity = 1.18,
    rimIntensity = 0.34,
  } = options;

  scene.add(
    new THREE.AmbientLight(0xffffff, ambientIntensity),
    new THREE.HemisphereLight(0xdad3c8, 0x10151c, hemiIntensity),
  );

  const keyLight = new THREE.DirectionalLight(0xf1dfc6, keyIntensity);
  keyLight.position.set(-1.8, 2.2, 4.1);

  const rimLight = new THREE.DirectionalLight(0x667789, rimIntensity);
  rimLight.position.set(2.1, -0.4, 2.7);

  scene.add(keyLight, rimLight);
}

function mountStaticScene({ canvas, host, exposure, buildScene }) {
  if (!canvas || !host) {
    return null;
  }

  try {
    const renderer = createRenderer(canvas, exposure);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, CAMERA_NEAR, CAMERA_FAR);
    const cleanupFns = [];

    camera.position.set(0, 0.08, 5.8);

    buildScene({ scene, camera, cleanupFns });

    const render = () => {
      renderer.render(scene, camera);
    };

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      const safeWidth = Math.max(Math.round(width), 1);
      const safeHeight = Math.max(Math.round(height), 1);

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(safeWidth, safeHeight, false);
      camera.aspect = safeWidth / safeHeight;
      camera.updateProjectionMatrix();
      render();
    };

    resize();

    let observer;
    if ("ResizeObserver" in window) {
      observer = new ResizeObserver(resize);
      observer.observe(host);
    } else {
      window.addEventListener("resize", resize);
    }

    return {
      destroy() {
        observer?.disconnect();
        window.removeEventListener("resize", resize);
        cleanupFns.forEach((cleanup) => cleanup());
        renderer.dispose();
        renderer.forceContextLoss?.();
      },
    };
  } catch {
    return null;
  }
}

export function createBoardSlabScene({ canvas, host, boardSize }) {
  if (!boardSize) {
    return null;
  }

  return mountStaticScene({
    canvas,
    host,
    exposure: 0.92,
    buildScene: ({ scene, cleanupFns }) => {
      const stage = new THREE.Group();
      const planeSize = getBoardPlaneSize(boardSize);
      const slabSize = {
        width: planeSize.width * 1.055,
        height: planeSize.height * 1.06,
        depth: 0.088,
      };

      scene.add(stage);
      addSharedLights(scene, {
        ambientIntensity: 0.44,
        hemiIntensity: 0.52,
        keyIntensity: 1.12,
        rimIntensity: 0.3,
      });

      const backShadow = new THREE.Mesh(
        new THREE.PlaneGeometry(slabSize.width * 1.06, slabSize.height * 1.04),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color("#000000"),
          transparent: true,
          opacity: 0.22,
          depthWrite: false,
        }),
      );
      backShadow.position.set(0, -0.04, -0.42);
      backShadow.scale.set(1, 0.92, 1);

      const slabGeometry = new THREE.ExtrudeGeometry(
        createRoundedRectShape(slabSize.width, slabSize.height, 0.19),
        {
          depth: slabSize.depth,
          bevelEnabled: true,
          bevelSegments: 5,
          bevelSize: 0.025,
          bevelThickness: 0.022,
          curveSegments: 22,
          steps: 1,
        },
      );
      slabGeometry.center();

      const slabMesh = new THREE.Mesh(
        slabGeometry,
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#151d25"),
          roughness: 0.86,
          metalness: 0.08,
        }),
      );
      slabMesh.position.set(0, -0.035, -0.24);

      const edgePlate = new THREE.Mesh(
        new THREE.ShapeGeometry(
          createRoundedRectShape(slabSize.width * 1.008, slabSize.height * 1.008, 0.195),
        ),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color("#344152"),
          transparent: true,
          opacity: 0.14,
          depthWrite: false,
        }),
      );
      edgePlate.position.set(0, -0.022, -0.19);

      stage.add(backShadow, slabMesh, edgePlate);

      registerMesh(cleanupFns, backShadow);
      registerMesh(cleanupFns, slabMesh);
      registerMesh(cleanupFns, edgePlate);
    },
  });
}

export function createTargetMarkerScene({ canvas, host, boardSize, targetItem }) {
  if (!boardSize || !targetItem) {
    return null;
  }

  return mountStaticScene({
    canvas,
    host,
    exposure: 0.98,
    buildScene: ({ scene, cleanupFns }) => {
      const isCompact = boardSize.width <= 900;
      const pinScale = isCompact ? 0.84 : 1;
      const stage = new THREE.Group();
      const planeSize = getBoardPlaneSize(boardSize);
      const targetPoint = toScenePoint(targetItem, boardSize, planeSize);
      const pinAnchor = targetPoint.clone().add(
        new THREE.Vector3(isCompact ? 0.024 : 0.03, isCompact ? 0.012 : 0.016, 0.02),
      );

      scene.add(stage);
      addSharedLights(scene, {
        ambientIntensity: 0.54,
        hemiIntensity: 0.58,
        keyIntensity: 1.24,
        rimIntensity: 0.42,
      });

      const contactShadow = new THREE.Mesh(
        new THREE.CircleGeometry(isCompact ? 0.06 : 0.07, 28),
        new THREE.MeshBasicMaterial({
          color: new THREE.Color("#000000"),
          transparent: true,
          opacity: 0.14,
          depthWrite: false,
        }),
      );
      contactShadow.position.set(pinAnchor.x - 0.012, pinAnchor.y - 0.012, -0.02);
      contactShadow.scale.set(1.18, 0.72, 1);

      const pinGroup = new THREE.Group();
      pinGroup.position.copy(pinAnchor);
      pinGroup.rotation.z = -0.18;
      pinGroup.rotation.x = 0.22;
      pinGroup.scale.setScalar(pinScale);

      const pinHead = new THREE.Mesh(
        new THREE.SphereGeometry(0.058, 24, 24),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#b64038"),
          roughness: 0.34,
          metalness: 0.08,
        }),
      );
      pinHead.position.y = 0.126;

      const pinCollar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.026, 0.038, 0.078, 20),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#8d302b"),
          roughness: 0.44,
          metalness: 0.1,
        }),
      );
      pinCollar.position.y = 0.05;

      const pinNeedle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.004, 0.005, 0.21, 14),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#d2cdc4"),
          roughness: 0.3,
          metalness: 0.62,
        }),
      );
      pinNeedle.position.y = -0.07;

      const pinTip = new THREE.Mesh(
        new THREE.ConeGeometry(0.008, 0.04, 12),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#cbc6bd"),
          roughness: 0.28,
          metalness: 0.68,
        }),
      );
      pinTip.position.y = -0.19;
      pinTip.rotation.z = Math.PI;

      pinGroup.add(pinHead, pinCollar, pinNeedle, pinTip);
      stage.add(contactShadow, pinGroup);

      registerMesh(cleanupFns, contactShadow);
      registerMesh(cleanupFns, pinHead);
      registerMesh(cleanupFns, pinCollar);
      registerMesh(cleanupFns, pinNeedle);
      registerMesh(cleanupFns, pinTip);
    },
  });
}
