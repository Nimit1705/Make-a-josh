import React, { useRef, useState } from "react";
import "./App.css";
import josh from "./assets/josh.png";
import logo from "./assets/logo.png";
import html2canvas from "html2canvas";
import bg1 from "./assets/bg1.png"
import bg2 from "./assets/bg2.png"
import bg3 from "./assets/bg3.png"
import bg4 from "./assets/bg4.png"
import bg5 from "./assets/bg5.png"
import bg6 from "./assets/bg6.png"
import bg7 from "./assets/bg7.png"
import bg8 from "./assets/bg8.png"
import bg9 from "./assets/bg9.png"
import folder from "./assets/folder.svg"

const App = () => {
  const [style, setStyle] = useState({
    background: "#0000ff",
  });

  const containerRef = useRef(null);

  const onColorChange = (e) => {
    setStyle({
      background: e.target.value,
    });
  };

  const onImageSelect = (image) => {
    setStyle({
      background: `url(${image}) center/cover no-repeat`,
    });
  };

  const downloadImage = async () => {
    if (containerRef.current) {
      const canvas = await html2canvas(containerRef.current, { backgroundColor: null });
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "joss.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    }
  };

  const onCustomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStyle({
          background: `url(${reader.result}) center/cover no-repeat`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="nav">
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="super-container">
        <div className="container" ref={containerRef}>
          <div className="josh" title="This is joss">
            <img src={josh} alt="Josh" />
          </div>
          <div className="background" style={style}></div>
        </div>
        <div className="picker">
          <div className="swatch">
            <div className="presets">
              <img className="bg-pre" src={bg1} onClick={() => onImageSelect(bg1)} />
              <img className="bg-pre" src={bg2} onClick={() => onImageSelect(bg2)} />
              <img className="bg-pre" src={bg3} onClick={() => onImageSelect(bg3)} />
              <img className="bg-pre" src={bg4} onClick={() => onImageSelect(bg4)} />
              <img className="bg-pre" src={bg5} onClick={() => onImageSelect(bg5)} />
              <img className="bg-pre" src={bg6} onClick={() => onImageSelect(bg6)} />
              <img className="bg-pre" src={bg7} onClick={() => onImageSelect(bg7)} />
              <img className="bg-pre" src={bg8} onClick={() => onImageSelect(bg8)} />
              <img className="bg-pre" src={bg9} onClick={() => onImageSelect(bg9)} />
            </div>
            <div className="custom">
              <input id="style" title="pick a color" type="color" value={style.background} onChange={onColorChange} />
              <input id="file"  name="file" type="file" accept="image/*" onChange={onCustomImageUpload} />
              <label  title="upload your background" className="file-label" htmlFor="file"><img src={folder} alt="" /></label>
            </div>
          </div>
        </div>
      </div>
      <button title="Download image" className="download" onClick={downloadImage}>
        Download
      </button>
      <div className="footer">
        <p>Made as a joke • 2025</p>
      </div>
    </>
  );
};

export default App;
