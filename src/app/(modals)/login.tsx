import { View, Text } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/src/constants/Colors";

const Login = () => {
  return (
    <View className="p-4 items-center w-full align-middle justify-center flex gap-4">
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        className="h-10 border rounded border-gray-500 p-2 bg-slate-100 w-5/6"
      ></TextInput>
      <View className="w-5/6">
        <TouchableOpacity
          className={`bg-red-500 p-2 rounded-md text-center items-center justify-center`}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
