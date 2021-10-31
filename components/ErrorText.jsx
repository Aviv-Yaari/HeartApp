import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLOR_PRIMARY_1 } from '../styles/base';

export function ErrorText(props) {
  return (
    <Text {...props} style={{ ...styles.errorText, ...props.style }}>
      {props.children}
    </Text>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: COLOR_PRIMARY_1,
  },
});
