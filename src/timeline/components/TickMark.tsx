import React from "react";

interface props {
  index: number;
}

const TickMark: React.FunctionComponent<props> = (props) => {
  let seconds = props.index;
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  const timestamp = `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }:${seconds < 10 ? "0" + seconds : seconds}`;
  console.log(timestamp);

  return (
    <div
      key={props.index}
      style={{
        width: "4vw",
        height: "25%",
        backgroundColor: "transparent",
        borderLeftColor: "white",
        borderLeftWidth: "2px",
        borderLeftStyle: "solid",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {props.index != 0 ? (
        <p
          style={{
            color: "white",
            height: "100%",
            zIndex: 200,
            marginTop: "1.5vh",
            marginLeft: "-4vw",
            userSelect: "none",
            fontSize: "0.7em",
          }}
        >
          {timestamp}
        </p>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TickMark;
