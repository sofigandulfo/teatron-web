import React from "react";

function Arrows({ transform }) {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="48px"
        viewBox="0 -960 960 960"
        width="35px"
        fill="#5f6368"
        transform={transform}
      >
        <path d="m242-200 210-280-210-280h74l210 280-210 280h-74Zm252 0 210-280-210-280h74l210 280-210 280h-74Z" />
      </svg>
    </>
  );
}

export default Arrows;
