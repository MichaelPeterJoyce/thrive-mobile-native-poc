import React from 'react'
import Svg, {Circle, Rect, Path, SvgProps} from 'react-native-svg';

const ChallengesIcon = (props: SvgProps) => {
    return (
        <Svg
            width={24}
            height={28}
            fill="none"
            {...props}
        >
            <Path
                d="M1.195 26.669V16.308v10.36Zm0-10.361V3.357s4.749-3.886 10.793 0c6.044 3.885 10.792 0 10.792 0v12.95s-4.748 3.886-10.792 0c-6.044-3.885-10.793 0-10.793 0Z"
                stroke="#4F5865"
                strokeWidth={1.943}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default ChallengesIcon
