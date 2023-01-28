import React, { useRef, useMemo, useState } from "react";

import { Button, IconButton } from "@material-tailwind/react";

import Caption from "./Caption";
import MemeUploader from "./MemeUploader";
import MemePreview from "./MemePreview";

import { useAsyncQuery } from "../utils/async-query.hook";

import FontsContext from "../utils/FontsContext";

import WebFont from "webfontloader";

export default function MemeContainer() {
  const [imgUrl, setImgUrl] = useState();
  const [captions, setCaptions] = useState([]);
  const canvasRef = useRef();

  const { data, isLoading, error } = useAsyncQuery(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${
      import.meta.env.PUBLIC_GOOGLE_FONTS_API_KEY
    }`
  );

  const webFonts = useMemo(() => {
    if (!data) return [];

    return data.items
      .map((font) => font.family)
      .filter((font) => {
        try {
          WebFont.load({
            google: {
              families: [font],
            },
          });
          return true;
        } catch (e) {
          return false;
        }
      });
  }, [data]);

  function handleCaptionChange(index, caption) {
    const captionsCpy = [...captions];

    captionsCpy[index] = { ...captionsCpy[index], ...caption };

    setCaptions(captionsCpy);
  }

  function addCaption(e) {
    e.preventDefault();

    const caption = {
      color: "#000000",
      font: "",
      fontFamily: "Adamina",
      fontSize: 50,
      text: "",
      x: 250,
      y: 160 + 20 * captions.length,
    };

    setCaptions((prevState) => [...prevState, caption]);
  }

  function removeCaption(index) {
    let captionsCpy = [...captions];

    captionsCpy.splice(index, 1);

    setCaptions(captionsCpy);
  }

  function saveMeme() {
    let link = document.createElement("a");
    link.download = `meme-${Date.now()}.png`;
    link.href = canvasRef.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    link.click();
    setTimeout(() => {
      link.remove();
    }, 1000);
  }

  return (
    <div className="container mx-auto min-h-screen py-10">
      <div className="flex flex-row h-full relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:rounded-lg sm:px-10">
        <div className="w-2/3 flex flex-col gap-4 ">
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="url"
            onInput={(e) => {
              setImgUrl(e.target.value);
              e.target.value = "";
              setCaptions([]);
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
                <span className="sr-only">Icon description</span>
              </button>
              <MemePreview
                captions={captions}
                imageUrl={imgUrl}
                onCaptionChange={handleCaptionChange}
                ref={canvasRef}
              />
            </div>
          ) : (
            <MemeUploader
              onFileInput={(url) => {
                setImgUrl(url);
                setCaptions([]);
              }}
            />
          )}
        </div>
        <div className="w-1/3 ">
          <div className="container mx-auto">
            {imgUrl && (
              <div className="flex flex-col">
                <IconButton
                  className="mb-2"
                  size="lg"
                  onClick={addCaption}
                  disabled={captions.length >= 4}
                >
                  <i className="glyphicon glyphicon-plus" />
                </IconButton>
                <FontsContext.Provider value={webFonts}>
                  {captions.map((caption, index) => (
                    <Caption
                      key={index}
                      caption={caption}
                      onCaptionChange={(newObj) =>
                        handleCaptionChange(index, newObj)
                      }
                      removeCaption={(e) => removeCaption(index)}
                    />
                  ))}
                </FontsContext.Provider>
                <Button
                  variant="filled"
                  disabled={captions.length === 0}
                  onClick={saveMeme}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
