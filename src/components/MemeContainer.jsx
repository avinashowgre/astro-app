import React, { useRef, useState } from "react";

import MemeUploader from "./MemeUploader";
import MemePreview from "./MemePreview";

export default function MemeContainer() {
  const [imgUrl, setImgUrl] = useState();
  const [captions, setCaptions] = useState([]);
  const canvasRef = useRef();

  function handleCaptionChange(index, caption) {
    const captionsCpy = [...captions];

    captionsCpy[index] = caption;

    setCaptions(captionsCpy);
  }

  return (
    <div className="container mx-auto h-screen">
      <div className="flex flex-row h-full">
        <div className="w-2/3">
          {imgUrl ? (
            <MemePreview
              captions={captions}
              imageUrl={imgUrl}
              onCaptionChange={handleCaptionChange}
              ref={canvasRef}
            />
          ) : (
            <MemeUploader onFileInput={setImgUrl} />
          )}
        </div>
        <div className="w-1/3 ">column2</div>
      </div>
    </div>
  );
}
