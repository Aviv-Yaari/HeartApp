import React from "react";
import { StyleSheet, Text } from "react-native";

export function ErrorText(props) {
  return (
    <Text {...props} style={{ ...style.errorText, ...props.style }}>
      {props.children}
    </Text>
  );
}

const style = StyleSheet.create({
  errorText: {
    color: "#F23864",
  },
});
