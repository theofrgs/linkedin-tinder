import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import {
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";
import TalentCard from "./TalentCard";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;

type Props = {
  profile: any;
  onSwipeOff: () => void;
};

const SwipeCard = ({ profile, onSwipeOff }: Props) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const rotate = pan.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-20deg", "0deg", "20deg"],
    extrapolate: "clamp",
  });

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      pan.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (Math.abs(gesture.dx) > SWIPE_THRESHOLD) {
        Animated.timing(pan, {
          toValue: { x: gesture.dx > 0 ? width : -width, y: gesture.dy },
          duration: 200,
          useNativeDriver: true,
        }).start(() => {
          onSwipeOff();
          pan.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        {
          transform: [...pan.getTranslateTransform(), { rotate }],
        },
      ]}
    >
      <TalentCard profile={profile} />
    </Animated.View>
  );
};

export default SwipeCard;
