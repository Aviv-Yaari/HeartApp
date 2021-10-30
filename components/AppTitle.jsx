import React from "react";
import { StyleSheet, Text } from "react-native";

export function AppTitle(props) {
  return <Text {...props} style={{ ...style.text, ...props.style }} />;
}

const style = StyleSheet.create({
  text: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: "#F23864",
    textShadowColor: "rgba(125, 0, 0, 0.35)",
    textShadowRadius: 2,
  },
});
