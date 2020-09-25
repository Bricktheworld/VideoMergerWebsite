import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDropzone } from "react-dropzone";
import DropZone from "./dropzone/DropZone";
import VideoPlayer from "./VideoPlayer/VideoPlayer";

const App = () => {
  const [videoDropText, setVideoDropText] = useState(
    "Drag n drop your video here or click to select a file"
  );
  const [audioDropText, setAudioDropText] = useState(
    "Drag n drop the template mp3 here or click to select"
  );
  const [videoFile, setVideoFile] = useState();
  const [templateAudioFile, setTemplateAudioFile] = useState();

  const getDropMenu = () => (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#36393E",
      }}
    >
      <DropZone
        onDrop={(acceptedFiles: any) => {
          acceptedFiles.forEach((file: any) => {
            if (file.type == "video/mp4") {
              setVideoDropText(file.name);
              setVideoFile(file);
            } else {
              setVideoDropText("Not the correct type. Please drop an mp4 file");
            }
          });
        }}
        dropText="Drop"
        dragText={videoDropText}
      ></DropZone>
      <DropZone
        onDrop={(acceptedFiles: any) => {
          acceptedFiles.forEach((file: any) => {
            if (file.type.startsWith("audio")) {
              setAudioDropText(file.name);
              setTemplateAudioFile(file);
            } else {
              setAudioDropText("Not the correct type. Please drop an mp4 file");
            }
          });
        }}
        dropText="Drop"
        dragText={audioDropText}
      ></DropZone>
    </div>
  );

  const getPage = () => {
    if (videoFile && templateAudioFile) {
      return (
        <VideoPlayer
          videoFile={videoFile}
          audioFile={templateAudioFile}
        ></VideoPlayer>
      );
    } else {
      return getDropMenu();
    }
  };

  return <div className="App">{getPage()}</div>;
};

export default App;
