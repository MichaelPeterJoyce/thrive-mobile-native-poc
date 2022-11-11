import React from "react";
import Svg, { Circle, Rect, Path, SvgProps } from "react-native-svg";

const ResetIcon = (props: SvgProps) => {
  return (
    <Svg width={39} height={37} fill="none" {...props}>
      <Path
        d="M1.619 17.41c0-9.281 8.802-9.281 8.802 0 0 8.909 9.975 8.909 9.975 0 0-9.28 9.389-9.282 9.389-.001 0 8.909 8.215 8.91 8.215 0"
        stroke="#4F5865"
        strokeWidth={1.705}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m1.619 15.628 1.723-.718a4.548 4.548 0 0 1 4.633.682l4.61 3.782a4.548 4.548 0 0 0 5.88-.093l3.2-2.801a4.548 4.548 0 0 1 5.99 0l2.943 2.576a4.548 4.548 0 0 0 6.165-.162L38 17.69"
        stroke="#4F5865"
        strokeWidth={0.682}
        strokeDasharray="0.01 1.14"
      />
    </Svg>
  );
};

export default ResetIcon;
