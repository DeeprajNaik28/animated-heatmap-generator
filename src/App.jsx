import { useState } from "react";
import ShaderCanvas from "./components/ShaderCanvas";

function App() {

  const [image, setImage] =
    useState(null);

  const [preset, setPreset] =
    useState("thermal");

  const [speed, setSpeed] =
    useState(1);

  const [distortion, setDistortion] =
    useState(0.03);

  const [glow, setGlow] =
    useState(1);

  const handleUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageURL =
      URL.createObjectURL(file);

    setImage(imageURL);
  };

  return (

    <div
  style={{
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    position: "relative"
  }}
>

      <div
        style={{
          position: "absolute",
          zIndex: 10,
          top: 20,
          left: 20,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          background: "rgba(0,0,0,0.6)",
          padding: "16px",
          borderRadius: "12px",
          color: "white",
          width: "220px",
          fontFamily: "sans-serif"
        }}
      >

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

        <select
          value={preset}
          onChange={(e) =>
            setPreset(e.target.value)
          }
        >

          <option value="thermal">
            Thermal
          </option>

          <option value="lava">
            Neon Lava
          </option>

          <option value="toxic">
            Toxic
          </option>

          <option value="ocean">
            Ocean
          </option>

          <option value="glitch">
            Glitch
          </option>

        </select>

        <label>
          Speed
        </label>

        <input
          type="range"
          min="0"
          max="5"
          step="0.1"
          value={speed}
          onChange={(e) =>
            setSpeed(
              parseFloat(
                e.target.value
              )
            )
          }
        />

        <label>
          Distortion
        </label>

        <input
          type="range"
          min="0"
          max="0.2"
          step="0.005"
          value={distortion}
          onChange={(e) =>
            setDistortion(
              parseFloat(
                e.target.value
              )
            )
          }
        />

        <label>
          Glow
        </label>

        <input
          type="range"
          min="0"
          max="3"
          step="0.1"
          value={glow}
          onChange={(e) =>
            setGlow(
              parseFloat(
                e.target.value
              )
            )
          }
        />

      </div>

      <ShaderCanvas
        image={image}
        preset={preset}
        speed={speed}
        distortion={distortion}
        glow={glow}
      />

    </div>
  );
}

export default App;