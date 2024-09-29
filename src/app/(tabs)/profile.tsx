import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";

const profile = {
  picture: require("../../../assets/images/profile_picture.jpg"),
  name: "Théo Fargeas",
  yrsExp: "5",
  jobTitle: "Fullstack developer",
  summary:
    "I've been a developer for a few years now, and have enriched my background with two semesters of study in San Francisco. I'm a FullStack web and mobile developer, with a preference for back-end applications. With over five years' experience, I've had the opportunity to work for a variety of companies, including a significant stint with an organization in Silicon Valley.",
  experience: [
    {
      title: "FullStack software developer",
      company: "Supernovia",
      period: "Sep 2023 - Present",
    },
    {
      title: "Front React Developer",
      company: "Uxopian",
      period: "Sep 2023 - Feb 2024",
    },
    {
      title: "Developer swiftui",
      company: "JustPaid.io",
      period: "Jun 2023 - Nov 2023",
    },
    {
      title: "Fullstack Web Developer",
      company: "Zenith RH - Freelance",
      period: "Jan 2023 - Jun 2023",
    },
    {
      title: "Fullstack web / mobile developer",
      company: "Berny",
      period: "Apr 2022 - Jul 2022",
    },
  ],
  education: [
    { degree: "Master 2", institution: "Epitech Paris", period: "2019-2024" },
  ],
};

const Profile = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showFullText, setShowFullText] = useState(false);

  return (
    <ScrollView>
      <View className="flex items-start p-4 w-full gap-4 mt-10">
        <View className="bg-center bg-no-repeat rounded-full w-32 h-32">
          <Image
            source={profile.picture}
            className="w-full h-full rounded-full"
          />
        </View>

        <View className="ml-4">
          <Text className="text-[#111518] text-[22px] font-bold">
            {profile.name}, {profile.yrsExp} years
          </Text>
          <Text className="text-[#637788] text-base">{profile.jobTitle}</Text>
        </View>
        <View className="w-full">
          <Text className="text-[#111518] text-lg font-bold">Summary</Text>
          <Text
            className="text-[#111518] text-base"
            numberOfLines={showFullText ? undefined : 3}
          >
            {profile.summary}
          </Text>
          <TouchableOpacity
            onPress={() => setShowFullText(!showFullText)}
            className="w-full items-center justify-center mt-2"
          >
            <Text className="text-[#198ae6] text-sm font-bold">
              {showFullText ? "See Less" : "See More"}
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full">
          <Text className="text-[#111518] text-lg font-bold">Experience</Text>
          {profile.experience.map((job, index) => (
            <View
              key={index}
              className="flex flex-row justify-between bg-white p-2 my-2 rounded"
            >
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text
                  className="text-[#111518] text-base font-medium"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {job.title}
                </Text>
                <Text className="text-[#637788] text-sm">{job.company}</Text>
              </View>
              <View>
                <Text className="text-[#637788] text-sm">{job.period}</Text>
              </View>
            </View>
          ))}
        </View>
        <View>
          <Text className="text-[#111518] text-lg font-bold">Education</Text>
          {profile.education.map((edu, index) => (
            <View
              key={index}
              className="flex flex-row justify-between bg-white p-2 my-2 rounded"
            >
              <View>
                <Text className="text-[#111518] text-base font-medium">
                  {edu.degree}
                </Text>
                <Text className="text-[#637788] text-sm">
                  {edu.institution}
                </Text>
              </View>
              <Text className="text-[#637788] text-sm">{edu.period}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
