import React, { useState } from "react";
import { Text, Animated, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SwipeCard from "../../components/SwipeCard";

const { width, height } = Dimensions.get("window");

const cards = [
  { image: require("../../../assets/images/hulk.webp"), title: "Hulk" },
  { image: require("../../../assets/images/ironman.webp"), title: "Ironman" },
  { image: require("../../../assets/images/thor.jpeg"), title: "Thor" },
];

const profiles = [
  {
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
  },
  {
    picture: require("../../../assets/images/corentin_bourdeau_pp.jpeg"),
    name: "Corentin Bourdeau",
    yrsExp: "5",
    jobTitle: "Développeur Front end / Mobile",
    summary:
      "Diplômé de l'École EPITECH en tant qu'expert en Technologies de l'Information, je suis passionné par le développement front-end.J'ai une solide expérience avec les technologies React, React Native, Dart et Python, et je suis toujours enthousiaste à l'idée de découvrir et maîtriser de nouveaux langages de programmation. Mon parcours à EPITECH, où j'ai acquis une formation rigoureuse et polyvalente, m'a permis de développer des compétences techniques approfondies tout en favorisant mon adaptabilité et ma capacité d'apprentissage.Aujourd'hui, je suis à la recherche d'une opportunité professionnelle qui me permettra de mettre en pratique mes compétences et de continuer à grandir en tant que développeur.",
    experience: [
      {
        title: "Full Stack Developer",
        company: "TalentSquare",
        period: "Sep 2023 - Present",
      },
      {
        title: "Développeur Full Stack",
        company: "EIP OutsideEIP",
        period: "Mar 2022 - Oct 2023",
      },
      {
        title: "Freelance",
        company: "Pnutz",
        period: "Mar 2023 - Apr 2023",
      },
      {
        title: "Stagiaire Full Stack",
        company: "Groupe Sigma",
        period: "Mar 2022 - Sep 2022",
      },
      {
        title: "Développeur front-end",
        company: "WOOKUPWOOKUP",
        period: "Nov 2021 - Feb 2022",
      },
    ],
    education: [
      { degree: "Master 2", institution: "Epitech Paris", period: "2019-2024" },
    ],
  },
  {
    picture: require("../../../assets/images/justin_menard_pp.jpeg"),
    name: "Justin Menard",
    yrsExp: "5",
    jobTitle: "Développeur backend chez Weenat",
    summary:
      "",
    experience: [
      {
        title: "Back End Developer",
        company: "Weenat",
        period: "Sep 2024 - Present",
      },
      {
        title: "Full Stack Developer",
        company: "TalentSquare",
        period: "Nov 2022 - Aug 2024",
      },
      {
        title: "Full Stack Developer",
        company: "APL Expert-Comptable",
        period: "Apr 2022 - Jul 2022",
      },
    ],
    education: [
      { degree: "Master 2", institution: "Epitech Paris", period: "2019-2024" },
    ],
  },
];

const SwipesPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeOff = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  return (
    <GestureHandlerRootView className="flex-1 h-full w-full justify-center items-center mt-10">
      {profiles.slice(currentIndex, currentIndex + 3).map((profile, index) => {
        const isFirst = index === 0;
        const scale = isFirst ? 1 : 1 - index * 0.01;
        const translateY = isFirst ? 0 : index * -10;
        return (
          <Animated.View
            key={index}
            style={{
              transform: [{ scale }, { translateY }],
              width: width - 40,
              height: height - 150,
              position: "absolute",
              zIndex: -index,
            }}
            className="rounded-lg shadow-lg"
          >
            <SwipeCard profile={profile} onSwipeOff={handleSwipeOff} />
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
