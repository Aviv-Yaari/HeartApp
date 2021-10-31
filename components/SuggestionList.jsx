import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLOR_LIGHT_1, COLOR_PRIMARY_1 } from '../styles/base';

export function SuggestionList({ suggestions, onSuggestionPress }) {
  // prettier-ignore
  return (
    <View style={styles.suggestionList}>
      {suggestions.map((suggestion, idx) => (
        <Pressable
          key={idx}
          style={({ pressed }) => [styles.suggestion, pressed && styles.pressed]}
          onPress={() => onSuggestionPress(suggestion.obj.name)}>
          <Text>
            {/* Mark common letters: */}
            {[...suggestion.obj.name].map((letter, idx) => (
              <Text
                key={idx}
                style={suggestion.indexes.includes(idx) ? styles.suggestionBoldLetter : styles.suggestionLetter}>
                {letter}
              </Text>
            ))}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  suggestionList: {
    position: 'absolute',
    top: 45,
    right: 0,
    left: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: COLOR_LIGHT_1,
    elevation: 3,
  },
  suggestion: {
    padding: 10,
    flex: 1,
    borderColor: COLOR_LIGHT_1,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
  },
  pressed: {
    backgroundColor: COLOR_LIGHT_1,
  },
  suggestionBoldLetter: {
    fontWeight: 'bold',
    color: COLOR_PRIMARY_1,
  },
  suggestionLetter: {
    fontWeight: 'normal',
    color: 'black',
  },
});
