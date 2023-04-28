import * as React from 'react';
import Svg, {Path, Rect, G, Circle} from 'react-native-svg';

export const UploadPhoto = props => (
  <Svg
    width={80}
    height={80}
    fill="none"
    xmlns="http://www.w3.org/2000/Svg"
    {...props}>
    <G opacity={0.8}>
      <Circle cx={40} cy={40} r={39.5} fill="#FFA001" stroke="#fff" />
      <Path
        d="M57.778 24.445H52.03l-6.015-6.016a2.214 2.214 0 0 0-1.572-.651h-8.888a2.213 2.213 0 0 0-1.572.65l-6.015 6.017h-5.747a4.449 4.449 0 0 0-4.444 4.444v24.444a4.449 4.449 0 0 0 4.444 4.445h35.556a4.449 4.449 0 0 0 4.444-4.445V28.89a4.449 4.449 0 0 0-4.444-4.444ZM40 51.11c-6.022 0-11.111-5.089-11.111-11.11 0-6.025 5.089-11.112 11.111-11.112S51.111 33.976 51.111 40c0 6.022-5.089 11.111-11.11 11.111Z"
        fill="#fff"
      />
      <Path
        d="M42.222 33.334h-4.444v4.444h-4.444v4.444h4.444v4.445h4.444v-4.445h4.445v-4.444h-4.445v-4.444Z"
        fill="#fff"
      />
    </G>
  </Svg>
);
