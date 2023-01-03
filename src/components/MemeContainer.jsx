import React, { useState } from "react";

import MemeUploader from "./MemeUploader";

export default function MemeContainer() {
  const [imgUrl, setImgUrl] = useState();
  const [captions, setCaptions] = useState([]);

  return (
    <div className="meme-container">
      <div className="row" style={{ display: "flex", flexDirection: "row" }}>
        <div className="col">
          <p>Input goes here</p>
          <div
            className="meme-preview-container"
            style={{
              border: "1px solid black",
              height: 500,
              position: "relative",
              width: 500,
            }}
          >
            {imgUrl ? <p>sample</p> : <MemeUploader onFileInput={setImgUrl} />}
          </div>
        </div>
        <div className="col">
          <p>column2</p>
        </div>
      </div>
    </div>
  );
}
