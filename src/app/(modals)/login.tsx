import React from "react";
import { View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const handleSubmit = (values: { email: string }) => {
    console.log(values.email);
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
      })}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View className="p-4 items-center w-full align-middle justify-center flex gap-4 mr-0">
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            className="h-10 border rounded border-gray-500 p-2 bg-slate-100 w-5/6"
          />
          {touched.email && errors.email && (
            <Text className="text-red-500">{errors.email}</Text>
          )}
          <View className="w-5/6">
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className={`bg-red-500 p-2 rounded-md text-center items-center justify-center`}
            >
              <Text className="text-white text-lg">Continue</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between align-middle items-center w-5/6">
            <View className="flex-1 border-[0.25px] border-gray-500 h-[0.25px] mr-2"></View>
            <Text className="text-black text-lg">or</Text>
            <View className="flex-1 border-[0.25px] border-gray-500 h-[0.25px] ml-2"></View>
          </View>

          <View className="w-5/6">
            <TouchableOpacity className="bg-transparent p-2 rounded-md text-center items-center justify-center border-black border relative">
              <View className="absolute left-4">
                <FontAwesome name="linkedin-square" size={24} color="black" />
              </View>
              <Text className="text-black text-lg font-semibold">LinkedIn</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default Login;
