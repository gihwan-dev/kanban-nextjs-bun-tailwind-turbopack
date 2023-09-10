import React from "react";

const DUMMY_DATA = ["Platform Launch", "Road map", "Marketing Plan"];

const SideNavLength: React.FC<{
  length: number;
}> = ({ length }) => {
  return (
    <div
      className={"-text--Medium-Grey text-xs font-bold mb-4 pl-8 box-border"}
    >
      ALL BOARDS ( {length} )
    </div>
  );
};

export default SideNavLength;
