import React from "react";
import Svg, { Circle, Rect, Path, SvgProps } from "react-native-svg";

const TodayIcon = (props: SvgProps) => {
  return (
    <Svg width={37} height={37} fill="none" {...props}>
      <Rect
        x={18.765}
        y={2.107}
        width={1.159}
        height={4.634}
        rx={0.579}
        fill="#1E0056"
      />
      <Rect
        x={18.765}
        y={31.072}
        width={1.159}
        height={4.634}
        rx={0.579}
        fill="#1E0056"
      />
      <Rect
        x={31.509}
        y={5.584}
        width={1.159}
        height={4.634}
        rx={0.579}
        transform="rotate(45 31.51 5.584)"
        fill="#1E0056"
      />
      <Rect
        x={31.509}
        y={31.212}
        width={1.159}
        height={4.634}
        rx={0.579}
        transform="rotate(135 31.51 31.212)"
        fill="#1E0056"
      />
      <Rect
        x={36.144}
        y={18.907}
        width={1.159}
        height={4.634}
        rx={0.579}
        transform="rotate(90 36.144 18.907)"
        fill="#1E0056"
      />
      <Path
        d="M12.972 18.908c0-.32-.194-.58-.434-.58H.66c-.24 0-.433.26-.433.58 0 .32.194.58.433.58h11.878c.24 0 .434-.26.434-.58ZM5.294 16.01h11.879c.239 0 .433-.26.433-.58 0-.32-.194-.58-.433-.58H5.294c-.239 0-.433.26-.433.58 0 .32.194.58.433.58ZM17.606 22.383c0-.32-.194-.58-.433-.58H5.294c-.239 0-.433.26-.433.58 0 .32.194.579.433.579h11.879c.239 0 .433-.26.433-.58Z"
        fill="#1E0056"
      />
      <Circle
        cx={19.344}
        cy={18.907}
        r={9.1}
        stroke="#1E0056"
        strokeWidth={1.497}
      />
    </Svg>
  );
};

export default TodayIcon;
