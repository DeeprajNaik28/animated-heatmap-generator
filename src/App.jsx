import { useState } from "react";
import ShaderCanvas from "./components/ShaderCanvas";

function App() {
const [isRecording, setIsRecording] =
  useState(false);

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

  const [showPanel, setShowPanel] =
    useState(true);

  const handleUpload = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageURL =
      URL.createObjectURL(file);

    setImage(imageURL);
  };

  const presetButtonStyle = (
    presetName
  ) => ({
    padding: "12px",
    borderRadius: "12px",
    border:
      preset === presetName
        ? "2px solid #ffffff"
        : "1px solid rgba(255,255,255,0.15)",
    background:
      preset === presetName
        ? "rgba(255,255,255,0.15)"
        : "rgba(255,255,255,0.05)",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
    transition: "0.2s"
  });

  return (

    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative"
      }}
    >

      <button
        onClick={() =>
          setShowPanel(!showPanel)
        }
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          zIndex: 20,
          padding: "12px 18px",
          border: "none",
          borderRadius: "14px",
          background:
            "rgba(15,15,15,0.8)",
          color: "white",
          cursor: "pointer",
          backdropFilter:
            "blur(10px)",
          fontWeight: "bold"
        }}
      >
        {showPanel
          ? "Hide Controls"
          : "Show Controls"}
      </button>


<button
  onClick={() => {

    if (
      window.startRecording
    ) {

      setIsRecording(true);

      window
        .startRecording()
        .finally(() =>
          setIsRecording(false)
        );
    }

  }}
  disabled={isRecording}
  style={{
    position: "absolute",
    top: "72px",
    right: "16px",
    zIndex: 20,
    padding: "12px 18px",
    border: "none",
    borderRadius: "14px",
    background: "#22c55e",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  {isRecording
    ? "Recording..."
    : "📥 Download GIF"}
</button>


      {showPanel && (

        <div
          className="control-panel"
          style={{
            position: "absolute",
            zIndex: 10,
            top: "16px",
            left: "16px",
            width: "min(340px, 90vw)",
            maxHeight: "90vh",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            padding: "18px",
            borderRadius: "20px",
            background:
              "rgba(15,15,15,0.75)",
            backdropFilter:
              "blur(15px)",
            border:
              "1px solid rgba(255,255,255,0.15)",
            color: "white",
            fontFamily:
              "Inter, sans-serif",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.4)"
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,
                fontSize: "24px"
              }}
            >
              HeatmapFX
            </h2>

            <p
              style={{
                marginTop: "5px",
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
                border:
                  "1px solid rgba(255,255,255,0.1)"
              }}
            />

          )}

          <h3
            style={{
              margin: "8px 0 0"
            }}
          >
            Presets
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: "10px"
            }}
          >

            <button
              style={presetButtonStyle(
                "thermal"
              )}
              onClick={() =>
                setPreset("thermal")
              }
            >
              🌈 Thermal
            </button>

            <button
              style={presetButtonStyle(
                "lava"
              )}
              onClick={() =>
                setPreset("lava")
              }
            >
              🔥 Lava
            </button>

            <button
              style={presetButtonStyle(
                "toxic"
              )}
              onClick={() =>
                setPreset("toxic")
              }
            >
              ☣ Toxic
            </button>

            <button
              style={presetButtonStyle(
                "ocean"
              )}
              onClick={() =>
                setPreset("ocean")
              }
            >
              🌊 Ocean
            </button>

            <button
              style={presetButtonStyle(
                "glitch"
              )}
              onClick={() =>
                setPreset("glitch")
              }
            >
              ⚡ Glitch
            </button>

          </div>

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
            Distortion:
            {" "}
            {distortion.toFixed(2)}
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
            Glow:
            {" "}
            {glow.toFixed(1)}
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

      )}

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