import React, { useState } from "react";
import { Text, Animated, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Card from "../../components/Card";

const { width, height } = Dimensions.get("window");

const cards = [
  { image: require("../../../assets/images/hulk.webp"), title: "Hulk" },
  { image: require("../../../assets/images/ironman.webp"), title: "Ironman" },
  { image: require("../../../assets/images/thor.jpeg"), title: "Thor" },
];

const SwipesPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeOff = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  return (
    <GestureHandlerRootView className="flex-1 h-full w-full justify-center items-center">
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
              height: height -150,
              position: "absolute",
              zIndex: -index,
            }}
            className="rounded-lg shadow-lg"
          >
            <Card card={card} onSwipeOff={handleSwipeOff} />
          </Animated.View>
        );
      })}
      {currentIndex >= cards.length && (
        <Text className="text-2xl font-bold">No more cards!</Text>
      )}
    </GestureHandlerRootView>
  );
};

export default SwipesPage;
