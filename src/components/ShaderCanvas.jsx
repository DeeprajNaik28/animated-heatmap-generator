import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ShaderCanvas({
  image,
  preset,
  speed,
  distortion,
  glow
}) {

  const mountRef = useRef(null);

  useEffect(() => {

    const scene = new THREE.Scene();

    const camera = new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      0,
      1
    );

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });

const canvas =
  renderer.domElement;

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

mountRef.current.innerHTML = "";

    mountRef.current.appendChild(
      renderer.domElement
    );

    const geometry =
      new THREE.PlaneGeometry(2, 2);

    const material =
      new THREE.ShaderMaterial({

        uniforms: {
          uTime: { value: 0 },
          uTexture: { value: null },
          uPreset: { value: 0 },
          uSpeed: { value: speed },
          uDistortion: {
            value: distortion
          },
          uGlow: { value: glow }
        },

        vertexShader: `
          varying vec2 vUv;

          void main() {

            vUv = uv;

            gl_Position =
              projectionMatrix *
              modelViewMatrix *
              vec4(position, 1.0);
          }
        `,

        fragmentShader: `
          uniform float uTime;
          uniform sampler2D uTexture;
          uniform float uPreset;
          uniform float uSpeed;
          uniform float uDistortion;
          uniform float uGlow;

          varying vec2 vUv;

          void main() {

            vec2 uv = vUv;

            float t =
              uTime * uSpeed;

            vec2 distortedUV = uv;

            distortedUV.y +=
              sin(
                uv.x * 10.0 + t
              ) * uDistortion;

            distortedUV.x +=
              cos(
                uv.y * 8.0 + t
              ) * uDistortion;

            vec4 texColor =
              texture2D(
                uTexture,
                distortedUV
              );

            float brightness =
              (
                texColor.r +
                texColor.g +
                texColor.b
              ) / 3.0;

            vec3 heatColor;

            if (uPreset == 0.0) {

                if (brightness < 0.25)
                    heatColor =
                      vec3(0.0, 0.0, 1.0);

                else if (brightness < 0.5)
                    heatColor =
                      vec3(0.0, 1.0, 1.0);

                else if (brightness < 0.75)
                    heatColor =
                      vec3(1.0, 1.0, 0.0);

                else
                    heatColor =
                      vec3(1.0, 0.0, 0.0);
            }

            else if (uPreset == 1.0) {

                heatColor =
                  mix(
                    vec3(0.3, 0.0, 0.5),
                    vec3(1.0, 0.4, 0.0),
                    brightness
                  );
            }

            else if (uPreset == 2.0) {

                heatColor =
                  mix(
                    vec3(0.0, 0.2, 0.0),
                    vec3(0.8, 1.0, 0.0),
                    brightness
                  );
            }

            else if (uPreset == 3.0) {

                heatColor =
                  mix(
                    vec3(0.0, 0.0, 0.3),
                    vec3(0.0, 1.0, 1.0),
                    brightness
                  );
            }

            else {

                heatColor =
                  vec3(
                    brightness,
                    sin(
                      t +
                      brightness * 5.0
                    ),
                    cos(
                      t +
                      brightness * 5.0
                    )
                  );
            }

            heatColor *= uGlow;

            gl_FragColor =
              vec4(heatColor, 1.0);
          }
        `
      });

    const mesh =
      new THREE.Mesh(
        geometry,
        material
      );

    scene.add(mesh);

    const presetMap = {
      thermal: 0,
      lava: 1,
      toxic: 2,
      ocean: 3,
      glitch: 4
    };

    material.uniforms.uPreset.value =
      presetMap[preset];

    if (image) {

      const textureLoader =
        new THREE.TextureLoader();

      textureLoader.load(image, (texture) => {

        material.uniforms.uTexture.value =
          texture;
      });
    }

    const animate = () => {

      requestAnimationFrame(animate);

      material.uniforms.uTime.value =
        performance.now() * 0.001;

      renderer.render(scene, camera);
    };

    animate();

window.startRecording =
  async () => {

    return new Promise(
      (resolve) => {

        const stream =
          canvas.captureStream(60);

        const recorder =
          new MediaRecorder(
            stream,
            {
              mimeType:
                "video/webm"
            }
          );

        const chunks = [];

        recorder.ondataavailable =
          (event) => {

            if (
              event.data.size > 0
            ) {

              chunks.push(
                event.data
              );
            }
          };

        recorder.onstop =
          () => {

            const blob =
              new Blob(
                chunks,
                {
                  type:
                    "video/webm"
                }
              );

            const url =
              URL.createObjectURL(
                blob
              );

            const a =
              document.createElement(
                "a"
              );

            a.href = url;

            a.download =
              "heatmap-animation.webm";

            a.click();

            URL.revokeObjectURL(
              url
            );

            resolve();
          };

        recorder.start();

        setTimeout(() => {

          recorder.stop();

        }, 5000);

      }
    );
  };

    const handleResize = () => {

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

      renderer.dispose();

      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(
          renderer.domElement
        )
      ) {

        mountRef.current.removeChild(
          renderer.domElement
        );
      }
    };

  }, [
    image,
    preset,
    speed,
    distortion,
    glow
  ]);

  return (
  <div
    ref={mountRef}
    style={{
      width: "100%",
      height: "100%"
    }}
  />
);
}