import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { COLOR_1 } from "../styles/base";
import { ErrorText } from "./ErrorText";

export function AppInput(props) {
  const { error, suggestions, onSuggestionPress } = props;

  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        style={[styles.input, error && styles.errorInput, props.style]}
      />
      {error && <ErrorText>{error}</ErrorText>}
      {suggestions?.length > 0 && (
        <Suggestions
          suggestions={suggestions}
          onSuggestionPress={onSuggestionPress}
        />
      )}
    </View>
  );
}

const Suggestions = ({ suggestions, onSuggestionPress }) => {
  return (
    <View style={styles.suggestions}>
      {suggestions.map((suggestion, idx) => (
        <Pressable
          key={idx}
          style={({ pressed }) => [
            styles.suggestion,
            { backgroundColor: pressed ? "#eee" : "#fff" },
          ]}
          onPress={() => onSuggestionPress(suggestion.obj.name)}
        >
          <Text>
            {[...suggestion.obj.name].map((letter, idx) => (
              <Text
                key={idx}
                style={
                  suggestion.indexes.includes(idx)
                    ? styles.suggestionBoldLetter
                    : styles.suggestionLetter
                }
              >
                {letter}
              </Text>
            ))}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
  },
  errorInput: {
    borderColor: COLOR_1,
  },
  suggestions: {
    position: "absolute",
    top: 45,
    right: 0,
    left: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 3,
  },
  suggestion: {
    padding: 10,
    flex: 1,
    borderColor: "#eee",
    borderBottomWidth: 1,
  },
  suggestionBoldLetter: {
    fontWeight: "bold",
    color: COLOR_1,
  },
  suggestionLetter: {
    fontWeight: "normal",
    color: "black",
  },
});
