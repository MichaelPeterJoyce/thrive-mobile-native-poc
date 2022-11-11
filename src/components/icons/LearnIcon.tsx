import React from "react";
import Svg, { Circle, Rect, Path, SvgProps } from "react-native-svg";

const LearnIcon = (props: SvgProps) => {
  return (
    <Svg width={41} height={40} fill="none" {...props}>
      <Path
        d="M32.274 9.52c0-.9-.728-1.628-1.627-1.628H23.73a3.255 3.255 0 0 0-3.255 3.255V31.49l1.348-1.348a6.51 6.51 0 0 1 4.604-1.907h4.22c.899 0 1.627-.729 1.627-1.627V9.52ZM8.676 9.52c0-.9.729-1.628 1.627-1.628h6.917a3.255 3.255 0 0 1 3.255 3.255V31.49l-1.348-1.348a6.51 6.51 0 0 0-4.603-1.907h-4.22a1.627 1.627 0 0 1-1.628-1.627V9.52Z"
        stroke="#4F5865"
        strokeWidth={1.831}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default LearnIcon;
