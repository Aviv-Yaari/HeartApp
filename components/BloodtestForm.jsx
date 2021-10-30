import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { AppInput } from "./AppInput";
import _ from "lodash";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { COLOR_1, COLOR_2 } from "../styles/base";

const validationSchema = yup.object({
  testName: yup.string().required("This field is required"),
  testResult: yup
    .number()
    .typeError("This field must be a number")
    .required("This field is required"),
});

export function BloodtestForm({ onSubmit, resetResult, getNameSuggestions }) {
  const [suggestions, setSuggestions] = useState(null);

  const handleChange = (formikProps, fieldName, value) => {
    if (fieldName === "testName") setSuggestions(getNameSuggestions(value));
    formikProps.setFieldValue(fieldName, value);
    resetResult();
  };

  const handleReset = (formikProps) => {
    formikProps.resetForm();
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
              keyboardType="number-pad"
              contextMenuHidden={true}
              error={props.touched.testResult && props.errors.testResult}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Pressable
              onPress={props.handleSubmit}
              style={[
                styles.submitButton,
                !_.isEmpty(props.errors) && styles.disabledButton,
              ]}
              disabled={!!suggestions?.length || !_.isEmpty(props.errors)}
            >
              <Text style={styles.buttonText}>Check test result</Text>
            </Pressable>
            <Pressable
              style={[styles.submitButton, styles.resetButton]}
              onPress={() => handleReset(props)}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </Pressable>
          </View>
        </>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    padding: 10,
    backgroundColor: COLOR_2,
    borderRadius: 5,
    elevation: 2,
  },
  resetButton: {
    backgroundColor: "#b0b0b0",
    elevation: 0,
    borderRadius: 20,
  },
  disabledButton: { backgroundColor: "#ccc" },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
  },
});
