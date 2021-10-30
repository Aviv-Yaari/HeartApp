import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { AppInput } from "./AppInput";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";

const validationSchema = yup.object({
  testName: yup.string().required("This field is required"),
  testResult: yup.string().required("This field is required"),
});

export function BloodtestForm({ onSubmit, resetResult, getNameSuggestions }) {
  const [suggestions, setSuggestions] = useState(null);

  const handleChange = (formikProps, fieldName, value) => {
    if (fieldName === "testName") setSuggestions(getNameSuggestions(value));
    formikProps.setFieldValue(fieldName, value);
    resetResult();
  };

  return (
    <Formik
      initialValues={{ testName: "", testResult: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        Keyboard.dismiss();
        const result = onSubmit(values);
        if (result) actions.setFieldValue("testName", result.name);
      }}
    >
      {(props) => (
        <>
          <View style={{ marginBottom: 10 }}>
            <AppInput
              placeholder="Test Name"
              onChangeText={(value) => handleChange(props, "testName", value)}
              onBlur={props.handleBlur("testName")}
              value={props.values.testName}
              error={props.touched.testName && props.errors.testName}
              suggestions={suggestions}
              onSuggestionPress={(value) => {
                handleChange(props, "testName", value);
                setSuggestions(null);
              }}
            />
            <AppInput
              editable={!suggestions?.length}
              placeholder="Result"
              onChangeText={(value) => handleChange(props, "testResult", value)}
              onBlur={props.handleBlur("testResult")}
              value={props.values.testResult}
              keyboardType="phone-pad"
              error={props.touched.testResult && props.errors.testResult}
            />
          </View>
          <Pressable
            onPress={props.handleSubmit}
            style={styles.button}
            disabled={!!suggestions?.length}
          >
            <Text style={styles.buttonText}>Check test result</Text>
          </Pressable>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "#1597E5",
    borderRadius: 6,
    alignSelf: "flex-start",
    elevation: 2,
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
  },
});
