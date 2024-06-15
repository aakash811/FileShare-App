import React from "react";

function ProgressBar({ progress = 40 }) {
  return (
    <div className="bg-gray-400 w-full mt-3 h-4 rounded-full">
      <div
        className=" bg-primary rounded-full h-4 text-[10px] text-white"
        style={{ width: `${progress}%` }}
      >
        {`${Number(progress).toFixed(0)}%`}
      </div>
    </div>
  );
}

export default ProgressBar;
