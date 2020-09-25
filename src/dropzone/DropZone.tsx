import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

/**
 * @param {string} dropText is the text that shows up once a file is dragged onto the file
 * @param {string} dragText the text that shows before the user actually drags a file on top of this component
 * @param {(acceptedFiles: any) => void} onDrop callback for the selecting of a file either by dragging a file on top or clicking and selecting a file
 * */
interface Props {
  dropText: string;
  dragText: string;
  onDrop: (acceptedFiles: any) => void;
}

const DropZone: React.FunctionComponent<Props> = (props: Props) => {
  const onDrop = useCallback(props.onDrop, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div
      {...getRootProps()}
      style={{
        display: "flex",
        backgroundColor: "grey",
        width: "70%",
        justifyContent: "center",
        paddingTop: "10vh",
        paddingBottom: "10vh",
        marginBottom: "5vh",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>{props.dropText}</p> : <p>{props.dragText}</p>}
    </div>
  );
};

export default DropZone;
