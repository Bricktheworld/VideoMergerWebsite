import React from "react";

interface Props {
  isPlaying: boolean;
  togglePlay: () => void;
}

const Toolbar: React.FunctionComponent<Props> = (props) => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {props.isPlaying ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100%"
          onClick={(e) => props.togglePlay()}
        >
          <g data-name="Layer 2">
            <g data-name="pause-circle">
              <rect width="24" height="24" opacity="0" />
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M15 8a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z" />
              <path d="M9 8a1 1 0 0 0-1 1v6a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z" />
            </g>
          </g>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100%"
          onClick={(e) => props.togglePlay()}
        >
          <g data-name="Layer 2">
            <g data-name="play-circle">
              <rect width="24" height="24" opacity="0" />
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12.34 7.45a1.7 1.7 0 0 0-1.85-.3 1.6 1.6 0 0 0-1 1.48v6.74a1.6 1.6 0 0 0 1 1.48 1.68 1.68 0 0 0 .69.15 1.74 1.74 0 0 0 1.16-.45L16 13.18a1.6 1.6 0 0 0 0-2.36zm-.84 7.15V9.4l2.81 2.6z" />
            </g>
          </g>
        </svg>
      )}
    </div>
  );
};

export default Toolbar;
