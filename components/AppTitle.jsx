import React from "react";
import { StyleSheet, Text } from "react-native";
import { COLOR_1 } from "../styles/base";

export function AppTitle(props) {
  return <Text {...props} style={{ ...styles.text, ...props.style }} />;
}

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: COLOR_1,
    textShadowColor: "rgba(125, 0, 0, 0.35)",
    textShadowRadius: 2,
  },
});
