import { View, Text, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";

type Props = {
  profile: any;
};

const TalentCard = ({ profile }: Props) => {
  return (
    <ImageBackground
      source={profile.picture}
      className="w-full h-full rounded-lg"
      imageStyle={{ borderRadius: 15 }}
      style={{ justifyContent: "flex-end" }}
    >
      <LinearGradient
        className="h-2/4 w-full absolute rounded-lg"
        colors={["transparent", "rgba(0,0,0,0.7)", "black"]}
      />
      <View className="p-5 bg-opacity-80">
        <Text className="text-white text-[22px] font-bold">
          {profile.name}, {profile.yrsExp} years
        </Text>
        <Text className="text-[#637788] text-base">{profile.jobTitle}</Text>
      </View>
    </ImageBackground>
  );
};

export default TalentCard;
