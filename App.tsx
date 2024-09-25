import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;

const cards = [
  { image: require("./assets/images/hulk.webp"), title: "Hulk" },
  { image: require("./assets/images/ironman.webp"), title: "Ironman" },
  { image: require("./assets/images/thor.jpeg"), title: "Thor" },
];

const SwipeableCard = ({
  card,
  onSwipeOff,
}: {
  card: any;
  onSwipeOff: () => void;
}) => {
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
        <View className="p-5 bg-opacity-80">
          <Text className="text-2xl font-bold text-white">{card.title}</Text>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeOff = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  return (
    <GestureHandlerRootView className="flex-1 h-full w-full bg-black justify-center items-center">
      {cards.slice(currentIndex, currentIndex + 3).map((card, index) => {
        const isFirst = index === 0;
        const scale = isFirst ? 1 : 1 - index * 0.01;
        const translateY = isFirst ? 0 : index * -10;
        return (
          <Animated.View
            key={index}
            style={{
              transform: [{ scale }, { translateY }],
              width: width - 40,
              height: height - 50,
              position: "absolute",
              zIndex: -index,
            }}
            className="rounded-lg shadow-lg"
          >
            <SwipeableCard card={card} onSwipeOff={handleSwipeOff} />
          </Animated.View>
        );
      })}
      {currentIndex >= cards.length && (
        <Text className="text-2xl font-bold">No more cards!</Text>
      )}
    </GestureHandlerRootView>
  );
}
