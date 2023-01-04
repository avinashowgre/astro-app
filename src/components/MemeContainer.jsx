import React, { useRef, useState } from "react";

import Caption from "./Caption";
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
            <div style={{ position: "relative" }}>
              <button
                className="close-btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={(e) => setImgUrl()}
                type="button"
              >
                <i className="glyphicon glyphicon-remove"></i>
                <span class="sr-only">Icon description</span>
              </button>
              <MemePreview
                captions={captions}
                imageUrl={imgUrl}
                onCaptionChange={handleCaptionChange}
                ref={canvasRef}
              />
            </div>
          ) : (
            <MemeUploader onFileInput={setImgUrl} />
          )}
        </div>
        <div className="w-1/4 ">
          <div className="container mx-auto">
            <Caption />
          </div>
        </div>
      </div>
    </div>
  );
}
