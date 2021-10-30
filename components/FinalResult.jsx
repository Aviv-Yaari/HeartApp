import { AppTitle } from "./AppTitle";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import HappyFaceImg from "../assets/lottie/happy-face.json";
import SadFaceImg from "../assets/lottie/sad-face.json";
import LottieView from "lottie-react-native";

export function FinalResult({ result }) {
  const getResultText = () => {
    if (result.name === "Unknown") return "Unknown";
    if (result.testResult < result.threshold) return "Good";
    return "Bad";
  };
  const resultText = getResultText();
  return (
    <View style={styles.container}>
      {resultText === "Good" && (
        <LottieView
          source={require("../assets/lottie/flying-hearts.json")}
          autoPlay
          loop={false}
          speed={0.5}
        />
      )}
      <AppTitle style={styles.appTitle}>{resultText}</AppTitle>
      {resultText !== "Unknown" && (
        <Text>
          The threshold for {result.name} is {result.threshold}.
        </Text>
      )}
      {resultText === "Unknown" && (
        <Text>Test name not found. Please check your input and try again.</Text>
      )}
      {resultText !== "Unknown" && (
        <LottieView
          style={styles.emojiImg}
          source={resultText === "Good" ? HappyFaceImg : SadFaceImg}
          autoPlay={true}
          loop={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 30, flexGrow: 1 },
  appTitle: { fontSize: 24, marginBottom: 10 },
  emojiImg: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
});
