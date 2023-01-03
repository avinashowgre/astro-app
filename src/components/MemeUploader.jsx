import React, { useCallback } from "react";

import { useDropzone } from "react-dropzone";

export default function MemeUploader(props) {
  const { onFileInput } = props;

  const overlayElemId = `overlay-elem`;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    onFileInput(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    onDrop,
  });

  return (
    <div
      style={{
        top: 0,
        left: 0,
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
      {...getRootProps()}
      id={`${overlayElemId}`}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
}
