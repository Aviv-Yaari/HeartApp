import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ErrorText } from "./ErrorText";

export function AppInput(props) {
  const { error, suggestions, onSuggestionPress } = props;

  return (
    <View style={style.container}>
      <TextInput
        {...props}
        style={[style.input, error && style.errorInput, props.style]}
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
    <View style={style.suggestions}>
      {suggestions.map((suggestion, idx) => (
        <Pressable
          key={idx}
          style={style.suggestion}
          onPress={() => onSuggestionPress(suggestion.obj.name)}
        >
          <Text>
            {[...suggestion.obj.name].map((letter, idx) => (
              <Text
                key={idx}
                style={
                  suggestion.indexes.includes(idx)
                    ? style.suggestionBoldLetter
                    : style.suggestionLetter
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

const style = StyleSheet.create({
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
    borderColor: "#F23864",
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
    zIndex: 1,
  },

  suggestion: {
    padding: 10,
    flexGrow: 1,
    borderColor: "#eee",
    borderBottomWidth: 1,
  },
  suggestionBoldLetter: {
    fontWeight: "bold",
    color: "#F23864",
  },
  suggestionLetter: {
    fontWeight: "normal",
    color: "black",
  },
});
