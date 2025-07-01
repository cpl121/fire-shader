# 🔥 Campfire Shader Scene (WebGL + Three.js)

This project renders a stylized **campfire** using **custom GLSL shaders** for fire and smoke, built with **Three.js** and **@react-three/fiber**.

The goal is to showcase procedural animation and visual effects using fragment and vertex shaders, running on WebGL.

---

## 🌐 Tech Stack

- [Three.js](https://threejs.org/)
- [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/)
- [GLSL](https://thebookofshaders.com/)
- [@react-three/drei](https://github.com/pmndrs/drei) (for camera and asset loading)
- React + Next.js (App Router)

---

## ✨ Features

- Procedural **fire effect** using:
  - Vertex displacement based on Perlin noise
  - Color gradient via distorted UVs
  - Additive blending with transparency

- Dynamic **smoke effect** using:
  - Vertical drift and noise-based dispersion
  - Soft fading edges
  - Independent shader animation

- Imported `.glb` 3D campfire model (single instance)

- Single Canvas, fully GPU-driven

---

## 🧠 Shader Highlights

- **Fire**:
  - Vertex animation with height-dependent distortion
  - Color blend from deep red to white-hot tips
  - Shape masking for flame silhouette

- **Smoke**:
  - Vertical upward flow
  - Twisting effect via time-animated UV distortion
  - Smooth edge transitions using `smoothstep`

## 📌 Notes

- Uses GLSL shaders loaded as raw strings via shaderMaterial.
- Not optimized for instancing or batching — single showcase scene.
- Make sure your browser supports WebGL 2.0.

## 🧪 Future Work

- Compare WebGL vs WebGPU performance
- Multi-instance rendering (grid of campfires)
- Upgrade to three-tsl or WGSL shaders

## 🛠 License

MIT — use freely and credit appreciated.
