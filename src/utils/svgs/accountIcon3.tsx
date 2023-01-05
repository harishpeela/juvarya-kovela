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

export const AccountIcon3 = props => (
  <Svg width={26} height={26} fill="none">
    <G clipPath="url(#a)">
      <Path
        d="M13 8.125V19.5m0-11.375s-3.792-3.25-7.583-.542V19.5c3.791-2.709 7.583 0 7.583 0s3.792-2.709 7.583 0V7.583C16.792 4.875 13 8.125 13 8.125Z"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Circle cx={13} cy={13} r={12} stroke="#000" strokeWidth={2} />
    <Defs>
      <ClipPath id="a">
        <Path
          fill="#fff"
          transform="translate(4.333 4.333)"
          d="M0 0h17.333v17.333H0z"
        />
      </ClipPath>
    </Defs>
  </Svg>
);
