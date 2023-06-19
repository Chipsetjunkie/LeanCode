import React from "react";

const RectangleSkeleton: React.FC = () => {
  return (
    <div className="space-y-2.5 animate-pulse">
      <div className="flex items-center space-x-2 w-full">
        <div className="h-3 w-full rounded bg-dark-fill-3"></div>
      </div>
    </div>
  );
};
export default RectangleSkeleton;
