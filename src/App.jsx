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
        className="control-panel"
        style={{
          position: "absolute",
          zIndex: 10,
          top: "16px",
          left: "16px",
          width: "min(320px, 90vw)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "18px",
          borderRadius: "20px",
          background: "rgba(15,15,15,0.75)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
          fontFamily: "Inter, sans-serif",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
        }}
      >

        <div>

          <h2
            style={{
              margin: 0,
              fontSize: "22px"
            }}
          >
            HeatmapFX
          </h2>

          <p
            style={{
              marginTop: "4px",
              fontSize: "13px",
              opacity: 0.7
            }}
          >
            Animated Image Heatmaps
          </p>

        </div>

        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />

        {image && (

          <img
            src={image}
            alt="preview"
            style={{
              width: "100%",
              height: "140px",
              objectFit: "cover",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          />

        )}

        <select
          value={preset}
          onChange={(e) =>
            setPreset(e.target.value)
          }
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "none",
            outline: "none"
          }}
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
          Speed: {speed}
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
          Distortion: {distortion.toFixed(2)}
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
          Glow: {glow.toFixed(1)}
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