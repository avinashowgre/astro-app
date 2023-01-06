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
    <div className="container mx-auto h-screen py-10">
      <div className="flex flex-row h-full relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10">
        <div className="w-3/4 flex flex-col gap-4 ">
          <input
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="url"
            onInput={(e) => {
              setImgUrl(e.target.value);
              e.target.value = "";
            }}
            placeholder="URL"
            type="text"
          ></input>
          {imgUrl ? (
            <div className="border" style={{ position: "relative" }}>
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
