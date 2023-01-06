import React, { forwardRef, useEffect, useState } from "react";

import { Bitmap, Stage, Text } from "@createjs/easeljs";

const TEST_ID = "meme-preview";

function MemePreview(props, ref) {
  const { imageUrl, onCaptionChange, captions } = props;
  const [canvasStage, setCanvasStage] = useState();

  useEffect(() => {
    setCanvasStage(new Stage(TEST_ID));
  }, []);

  useEffect(() => {
    if (!canvasStage) return;

    draw();
  }, [imageUrl, captions, canvasStage]);

  function drag(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    evt.target.cursor = "pointer";
    canvasStage.update();
  }

  function drop(evt, index) {
    if (onCaptionChange) {
      const { text, x, y } = evt.target;
      onCaptionChange(index, {
        ...captions[index],
        text,
        x,
        y,
      });
    }
  }

  function draw() {
    canvasStage.removeAllChildren();

    const image = new Image();

    image.onload = () => {
      ref.current.width = image.width;
      ref.current.height = image.height;

      var bitmap = new Bitmap(image);

      canvasStage.addChild(bitmap);

      captions.forEach((caption, index) => {
        const { color, font, fontFamily, fontSize, text, x, y } = caption;
        let createText = new Text();
        createText.set({
          color,
          text,
          font: `${font.trim()} ${fontSize}px ${fontFamily}`,
          lineWidth: canvasStage.canvas.width,
          lineHeight: 20 * index,
          textBaseline: "top",
          textAlign: "left",
          x,
          y,
        });
        createText.on("pressmove", drag);
        createText.on("pressup", function (evt) {
          drop(evt, index);
        });
        canvasStage.addChild(createText);
      });

      canvasStage.update();
    };

    image.src = imageUrl;
  }

  return (
    <canvas
      ref={ref}
      height="600"
      id={TEST_ID}
      style={{
        border: "1px solid black",
        margin: "auto",
        minWidth: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
      width="500"
    ></canvas>
  );
}

export default forwardRef(MemePreview);
