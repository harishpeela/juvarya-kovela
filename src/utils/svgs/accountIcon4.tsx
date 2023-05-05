import * as React from 'react';
import {ClipPath} from 'react-native-svg';
import Svg, {
  Rect,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
  Circle,
  G,
} from 'react-native-svg';

export const AccountIcon4 = props => (
  <Svg
    width={26}
    height={26}
    fill="none"
    xmlns="http://www.w3.org/2000/Svg"
    {...props}>
    <Path
      d="M18.778 12.277v1.445h-1.444L15.167 6.5V5.054h-1.444V6.5h-1.445V5.054h-1.444v1.517l-2.167 7.15H7.222v-1.445H5.778v7.945h6.5V16.61h1.444v3.61h6.5v-7.944h-1.444Zm-3.394 0h-4.767l.433-1.444h3.9l.434 1.444Zm-.867-2.889h-3.033l.433-1.444h2.167l.433 1.444Zm4.261 9.39h-3.611v-3.612h-4.333v3.611H7.222v-3.61H9.75l.434-1.445h5.633l.433 1.444h2.528v3.611Z"
      fill="#FFA001"
    />
    <Circle cx={13} cy={13} r={12} stroke="#FFA001" strokeWidth={2} />
  </Svg>
);
