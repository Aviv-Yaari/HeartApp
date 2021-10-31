import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLOR_PRIMARY_1 } from '../styles/base';
import { ErrorText } from './ErrorText';
import { SuggestionList } from './SuggestionList';

export function AppInput(props) {
  const { error, suggestions, onSuggestionPress } = props;

  return (
    <View style={styles.container}>
      <TextInput {...props} style={[styles.input, error && styles.errorInput, props.style]} />
      {error && <ErrorText>{error}</ErrorText>}
      {suggestions?.length > 0 && <SuggestionList suggestions={suggestions} onSuggestionPress={onSuggestionPress} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
  },
  errorInput: {
    borderColor: COLOR_PRIMARY_1,
  },
});
