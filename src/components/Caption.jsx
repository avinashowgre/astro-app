import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  IconButton,
  Option,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
} from "@material-tailwind/react";

import FontsContext from "../utils/FontsContext";

function MoreOptionsMenu(props) {
  const { onStyleChange, styles } = props;
  const { color, font, fontFamily, fontSize } = styles;
  const [fontStyles, setFontStyles] = useState({
    bold: false,
    color: "",
    italic: false,
  });

  const webFonts = useContext(FontsContext);

  useEffect(() => {
    const { bold, italic, ...others } = fontStyles;
    let font = ``;

    if (bold) {
      font += ` bold`;
    }

    if (italic) {
      font += ` italic`;
    }

    onStyleChange({
      font,
      ...others,
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

  const FontSizeSlider = (props) => {
    const { fontSize, onChange } = props;

    return (
      <Popover
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button className="border-black border rounded bg-white" size="sm">
            <img
              src="https://www.gstatic.com/images/icons/material/system_gm/2x/format_size_black_20dp.png"
              width="20px"
              height="20px"
            />
          </Button>
        </PopoverHandler>
        <PopoverContent>
          <input
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
            id="small-range"
            min={10}
            max={200}
            onChange={onChange}
            type="range"
            value={fontSize}
          />
        </PopoverContent>
      </Popover>
    );
  };

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
              className="m-0 flex items-center justify-center select-none cursor-pointer text-black border-black rounded border
   py-3 px-6 font-bold transition-colors duration-200 peer-checked:bg-gray-200 ease-in-out "
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
              className="m-0 flex items-center justify-center select-none cursor-pointer text-black border-black rounded border
   py-3 px-6 font-bold transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 "
            >
              <i className="glyphicon glyphicon-italic"></i>
            </label>
          </div>

          <div className="flex mr-2">
            <select
              id="countries"
              className="bg-gray-50 border border-black rounded  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              onChange={(e) =>
                handleFontStyleChange({ fontFamily: e.target.value })
              }
              value={fontFamily}
            >
              <option value="">Choose Font</option>
              {webFonts.map((font, index) => (
                <option key={index} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <FontSizeSlider
            fontSize={fontSize}
            onChange={(e) =>
              handleFontStyleChange({ fontSize: e.target.valueAsNumber })
            }
          />

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
  const { color, font, fontFamily, fontSize } = caption;

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
        className="block w-full p-2 text-gray-900 rounded-sm border border-gray-300 bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        id="small-input"
        onInput={(e) => handleInputChange(e.target.value)}
        placeholder="Add Caption"
        type="text"
      />

      <MoreOptionsMenu
        styles={{ color, font, fontFamily, fontSize }}
        onStyleChange={handleStyleChange}
      />

      <IconButton size="lg" color="red" onClick={removeCaption}>
        <i className="glyphicon glyphicon-trash" />
      </IconButton>
    </div>
  );
}
