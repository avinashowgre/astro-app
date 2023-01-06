import React, { useEffect, useState } from "react";

import {
  IconButton,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";

function MoreOptionsMenu(props) {
  const { onStyleChange, styles } = props;
  const { color, font } = styles;
  const [fontStyles, setFontStyles] = useState({
    bold: false,
    color: "",
    italic: false,
  });

  useEffect(() => {
    const { bold, color, italic } = fontStyles;
    let font = ``;

    if (bold) {
      font += ` bold`;
    }

    if (italic) {
      font += ` italic`;
    }

    onStyleChange({
      font,
      color,
    });
  }, [fontStyles]);

  function handleFontStyleChange(font) {
    setFontStyles((prevState) => {
      return {
        ...prevState,
        ...font,
      };
    });
  }

  return (
    <Popover
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <PopoverHandler>
        <IconButton size="lg">
          <i className="glyphicon glyphicon-menu-hamburger" />
        </IconButton>
      </PopoverHandler>
      <PopoverContent>
        <div className="inline-flex ">
          <div className="flex mr-2">
            <input
              type="checkbox"
              id="font-bold"
              className="peer hidden"
              onChange={(e) =>
                handleFontStyleChange({ bold: e.target.checked })
              }
              checked={font.indexOf("bold") > -1}
            />
            <label
              htmlFor="font-bold"
              className="select-none cursor-pointer text-black border-black rounded border border-gray-200
   py-3 px-6 font-bold transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 "
            >
              <i className="glyphicon glyphicon-bold"></i>
            </label>
          </div>

          <div className="flex mr-2">
            <input
              type="checkbox"
              id="font-italic"
              className="peer hidden"
              onChange={(e) =>
                handleFontStyleChange({ italic: e.target.checked })
              }
              checked={font.indexOf("italic") > -1}
            />
            <label
              htmlFor="font-italic"
              className="select-none cursor-pointer text-black border-black rounded border border-gray-200
   py-3 px-6 font-bold transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 "
            >
              <i className="glyphicon glyphicon-italic"></i>
            </label>
          </div>

          <input
            className="border"
            type="color"
            id="color-picker"
            name="body"
            onChange={(e) => handleFontStyleChange({ color: e.target.value })}
            style={{
              cursor: "pointer",
              margin: 4,
            }}
            value={color}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function Caption(props) {
  const { caption, onCaptionChange, removeCaption } = props;
  const { color, font } = caption;

  function handleInputChange(text) {
    onCaptionChange({
      ...caption,
      text,
    });
  }

  function handleStyleChange(styles) {
    onCaptionChange({
      ...caption,
      ...styles,
    });
  }

  return (
    <div className="flex flex-row basis-full space-x-2 mb-2 p-4 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <input
        className="block w-full p-2 text-gray-900 rounded-sm border border-gray-300 bg-gray-50 sm:text-xs  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        id="small-input"
        onInput={(e) => handleInputChange(e.target.value)}
        placeholder="Add Caption"
        type="text"
      />

      <MoreOptionsMenu
        styles={{ color, font }}
        onStyleChange={handleStyleChange}
      />

      <IconButton size="lg" color="red" onClick={removeCaption}>
        <i className="glyphicon glyphicon-trash" />
      </IconButton>
    </div>
  );
}
