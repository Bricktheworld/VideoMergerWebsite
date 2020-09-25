import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import Waveform from "../../waveform/waveform";

interface props {
  file: any;
  isTemplate: boolean;
  onReceivedMetaData: (duration: number) => void;
  onChangeOffset: (offset: number) => void;
}

const TimelineAudioItem: React.FunctionComponent<props> = (props) => {
  const [duration, setDuration] = useState(0);
  const audio = useRef<HTMLAudioElement | null>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    document.body.addEventListener(
      "wheel",
      (e) => {
        if (e.ctrlKey) {
          e.preventDefault();
          console.log(e.deltaY);
        }
      },
      { passive: false }
    );
  }, []);

  return (
    <Draggable
      axis="x"
      disabled={props.isTemplate}
      onStop={(e, position) => {
        props.onChangeOffset(
          (position.x / position.node.clientWidth) * duration
        );
      }}
    >
      <div
        style={{
          width: duration * 4 + "vw",
          backgroundColor: "#00647a",
          marginBottom: "2.5vh",
        }}
      >
        <div
          className="parent-component"
          style={{ width: "100%", height: "100%" }}
        >
          <Waveform src={window.URL.createObjectURL(props.file)} />
          <audio
            src={window.URL.createObjectURL(props.file)}
            ref={audio}
            onLoadedMetadata={(e) => {
              if (audio.current) {
                setDuration(audio.current.duration);
                props.onReceivedMetaData(audio.current.duration);
              }
            }}
          ></audio>
        </div>
      </div>
    </Draggable>
  );
};

export default TimelineAudioItem;
