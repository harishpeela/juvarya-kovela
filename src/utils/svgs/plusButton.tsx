import * as React from 'react';
import Svg, {Path, Rect, Circle} from 'react-native-svg';
import { colors } from '../../common';
export function PlusButton() {
  return (
    <Svg width={38} height={38} fill="none">
      <Rect width={38} height={38} rx={10} fill="#06B3C4" />
      <Path
        d="M25 15.5a1.5 1.5 0 1 0-3 0V22h-6.5a1.5 1.5 0 1 0 0 3H22v6.5a1.5 1.5 0 1 0 3 0V25h6.5a1.5 1.5 0 1 0 0-3H25v-6.5Z"
        fill="#fff"
      />
    </Svg>
  );
}
