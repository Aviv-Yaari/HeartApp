import { AppTitle } from "./AppTitle";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import HappyFaceImg from "../assets/happy-face.png";
import SadFaceImg from "../assets/sad-face.png";

export function FinalResult({ result }) {
  const getResultText = () => {
    if (result.name === "Unknown") return "Unknown";
    if (result.testResult < result.threshold) return "Good";
    return "Bad";
  };
  const resultText = getResultText();
  return (
    <View style={styles.container}>
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
        <Image
          style={styles.emojiImg}
          source={resultText === "Good" ? HappyFaceImg : SadFaceImg}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginTop: 30 },
  appTitle: { fontSize: 24, marginBottom: 10 },
  emojiImg: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
});
