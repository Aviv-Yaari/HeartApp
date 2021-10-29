import { AppTitle } from "./AppTitle";
import React from "react";
import { Text, View } from "react-native";

export function FinalResult({ result }) {
  const checkResult = () => {
    if (result.name === "Unknown") return "Unknown";
    if (result.testResult < result.threshold) return "Good";
    return "Bad";
  };
  return (
    <View>
      <AppTitle style={{ fontSize: 24 }}>{checkResult()}!</AppTitle>

      {result.name !== "Unknown" && (
        <Text>
          The threshold for {result.name} is {result.threshold}.
        </Text>
      )}
      {result.name === "Unknown" && (
        <Text>Test name not found. Please check your input and try again.</Text>
      )}
    </View>
  );
}
