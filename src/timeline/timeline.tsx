import { off } from "process";
import React, { useEffect, useRef, useState } from "react";
import Toolbar from "../toolbar/Toolbar";
import Waveform from "../waveform/waveform";
import TickMark from "./components/TickMark";
import TimelineAudioItem from "./components/TimelineAudioItem";

interface Props {
  videoFile: any;
  audioFile: any;
  onChangeOffset: (offset: number) => void;
  offset: number;
}

const Timeline: React.FunctionComponent<Props> = (props) => {
  const container = useRef<HTMLDivElement | null>(null);
  const [longestDuration, setLongestDuration] = useState(0);
  const [timeline, setTimeline] = useState<any[]>([]);

  const getOffset = () => {
    if (props.offset > 0) {
      return props.offset;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    let arr = new Array(Math.floor(longestDuration + getOffset())).fill(null);
    setTimeline(arr);
    console.log("Use effect " + arr.length);
  }, [longestDuration, props.offset]);

  return (
    <div
      style={{
        height: "40vh",
        width: "100vw",
        overflowX: "scroll",
        overflowY: "hidden",
      }}
      ref={container}
      onWheel={(e) => {
        e.preventDefault();
        if (container.current && !e.ctrlKey) {
          var containerScrollPosition = container.current.scrollLeft;
          container.current.scrollTo({
            top: 0,
            left: containerScrollPosition + e.deltaY,
            // behaviour: 'smooth' //if you want smooth scrolling
          });
        }
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          height: "3vh",
          width: (longestDuration + getOffset()) * 4 + "vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {timeline.map((val: null, index: number) => {
          return <TickMark key={index} index={index}></TickMark>;
        })}
      </div>
      <TimelineAudioItem
        file={props.videoFile}
        isTemplate={false}
        onReceivedMetaData={(duration) => {
          if (duration > longestDuration) {
            setLongestDuration(duration);
          }
        }}
        onChangeOffset={(offset) => {
          props.onChangeOffset(offset);
        }}
      ></TimelineAudioItem>
      <TimelineAudioItem
        file={props.audioFile}
        isTemplate={true}
        onReceivedMetaData={(duration) => {
          if (duration > longestDuration) {
            setLongestDuration(duration);
          }
        }}
        onChangeOffset={(offset) => {}}
      ></TimelineAudioItem>
    </div>
  );
};

export default Timeline;
