import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"

export const Accomodation = (props) => (
  <Svg
    width={60}
    height={60}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={60} height={60} rx={30} fill="#D9D9D9" />
    <G clipPath="url(#a)">
      <Path d="M41.36 13.206H18.64v30.207h22.72V13.206Z" fill="#EAC36E" />
      <Path
        d="M41.36 13.206H18.64v1.48h22.72v-1.48ZM20.69 46.619v3.38h-2.675l.47-.75c.303-.48.22-1.123-.219-1.482a1.482 1.482 0 0 1-.544-1.148M42.278 46.619c0 .463-.212.875-.544 1.148-.44.36-.522 1.002-.22 1.482l.471.75H39.31v-3.38"
        fill="#EAC36E"
      />
      <Path
        d="M16.36 44.885v1.733h27.28v-1.733a1.472 1.472 0 0 1-1.472-1.472H17.833c0 .813-.66 1.472-1.472 1.472ZM43.64 10v1.734c-.813 0-1.472.659-1.472 1.472H17.832c0-.813-.659-1.472-1.471-1.472V10h27.278Z"
        fill="#FCD577"
      />
      <Path
        d="M43.64 11.734c-.813 0-1.472.659-1.472 1.472H17.832c0-.813-.659-1.472-1.471-1.472h27.278Z"
        fill="#EAC36E"
      />
      <Path
        d="M40.229 36.88H19.772v5.401h20.457V36.88ZM28.856 14.338H19.76v20.279h9.097v-20.28ZM40.24 14.338h-9.096v20.279h9.097v-20.28Z"
        fill="#FCD577"
      />
      <Path
        d="M26.45 27.347c-.575 0-.868-.729-.45-1.126a.66.66 0 0 1 .758-.102c.246.13.383.413.336.687a.66.66 0 0 1-.644.541ZM33.55 27.347c-.58 0-.873-.739-.443-1.133a.661.661 0 0 1 .721-.11c.26.123.413.414.365.698a.66.66 0 0 1-.644.545ZM24.516 40.318a.66.66 0 0 1-.609-.418.658.658 0 0 1 .207-.75c.472-.368 1.173.073 1.038.658a.66.66 0 0 1-.636.51ZM35.484 40.318a.659.659 0 0 1-.609-.418.659.659 0 0 1 .218-.758c.455-.338 1.124.053 1.037.619a.66.66 0 0 1-.646.557Z"
        fill="#BA6B24"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(10 10)" d="M0 0h40v40H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

