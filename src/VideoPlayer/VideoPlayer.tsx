import { off } from "process";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Timeline from "../timeline/timeline";
import Toolbar from "../toolbar/Toolbar";
import Waveform from "../waveform/waveform";
import { TimingObject } from "timing-object";
import { setTimingsrc } from "timingsrc";

interface Props {
  videoFile: any;
  audioFile: any;
}

const VideoPlayer: React.FunctionComponent<Props> = (props: Props) => {
  const fileReader: FileReader = new FileReader();
  const [postion, setPostion] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timingObject = new TimingObject();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onpause = (e) => {
        setIsPlaying(false);

        if (videoRef.current) videoRef.current.pause();
      };
    }
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      if (videoRef.current && audioRef.current) {
        videoRef.current.currentTime = audioRef.current.currentTime - offset;
        videoRef.current.play();
      }
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#36393E",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "50vh",
          width: "100vw",
        }}
      >
        <video style={{ width: "100%", height: "100%" }} ref={videoRef}>
          <source
            src={window.URL.createObjectURL(props.videoFile)}
            type="video/mp4"
          ></source>
        </video>
        <audio ref={audioRef}>
          <source src={window.URL.createObjectURL(props.audioFile)}></source>
        </audio>
        <div
          style={{
            // width: "20vw",
            height: "10vh",
            fontSize: "2em",
            color: "black",
            position: "absolute",
            bottom: "10vh",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <a
            style={{
              backgroundColor: "green",
              padding: "20px",
              display: "inline-block",
              userSelect: "none",
            }}
            href=""
            onClick={(e) => {}}
            download
          >
            Export
          </a>
        </div>
      </div>
      <div
        style={{
          height: "5vh",
          width: "100vw",
          backgroundColor: "#36393E",
          zIndex: 400,
        }}
      >
        <Toolbar
          isPlaying={isPlaying}
          togglePlay={() => setIsPlaying(!isPlaying)}
        ></Toolbar>
      </div>
      <div
        style={{
          height: "30vh",
          width: "100vw",
          backgroundColor: "#36393E",
        }}
      >
        <Timeline
          onChangeOffset={(offset) => {
            setIsPlaying(false);
            setOffset(offset);
          }}
          videoFile={props.videoFile}
          audioFile={props.audioFile}
          offset={offset}
        ></Timeline>
      </div>
    </div>
  );
};

export default VideoPlayer;
