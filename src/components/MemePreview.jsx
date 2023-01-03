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
        ...texts[index],
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
      var bitmap = new Bitmap(image);
      bitmap.scaleX = ref.current.width / image.width;
      bitmap.scaleY = ref.current.height / image.height;

      canvasStage.addChild(bitmap);

      captions.forEach((caption, index) => {
        const { color, font, fontFamily, fontSize, text, x, y } = caption;
        let createText = new Text();
        createText.set({
          color,
          text,
          font: `${font} ${fontSize}px ${fontFamily}`,
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
        maxWidth: "100%",
        height: "auto",
      }}
      width="500"
    ></canvas>
  );
}

export default forwardRef(MemePreview);
