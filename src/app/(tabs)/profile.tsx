import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Profile = () => {
  return (
    <View className="m-10 mt-20">
      <Link href={"/(modals)/login"}>Login</Link>
    </View>
  );
};

export default Profile;
