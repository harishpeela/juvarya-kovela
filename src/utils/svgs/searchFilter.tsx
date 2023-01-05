import * as React from 'react';
import Svg, {Path, Rect, Circle} from 'react-native-svg';

export function SearchFilter() {
  return (
    <Svg width={48} height={48} fill="none" xmlns="http://www.w3.org/2000/Svg">
      <Rect width={48} height={48} rx={10} fill="#CEF3E8" fillOpacity={0.4} />
      <Path stroke="#0A673B" strokeWidth={2} d="M11 19h18" />
      <Circle cx={34} cy={19} r={3.5} fill="#0A673B" stroke="#0A673B" />
      <Path stroke="#0A673B" strokeWidth={2} d="M38 29H20" />
      <Circle
        r={3.5}
        transform="matrix(-1 0 0 1 15 29)"
        fill="#0A673B"
        stroke="#0A673B"
      />
    </Svg>
  );
}
