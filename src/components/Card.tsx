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

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;

type Props = {
  card: any;
  onSwipeOff: () => void;
};

const Card = ({ card, onSwipeOff }: Props) => {
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
      <ImageBackground
        source={card.image}
        className="w-full h-full rounded-lg"
        imageStyle={{ borderRadius: 15 }}
        style={{ justifyContent: "flex-end" }}
      >
        <LinearGradient
          className="h-2/4 w-full absolute rounded-lg"
          colors={["transparent", "rgba(0,0,0,0.7)", "black"]}
        />
        <View className="p-5 bg-opacity-80">
          <Text className="text-2xl font-bold text-white">{card.title}</Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default Card;
