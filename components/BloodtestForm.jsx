import React from "react";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import { AppInput } from "./AppInput";
import { Button, Text } from "react-native";

const validationSchema = yup.object({
  testName: yup.string().required("This field is required"),
  testResult: yup.string().required("This field is required"),
});

export function BloodtestForm({ onSubmit, resetResult }) {
  const handleChange = (formikProps, fieldName, value) => {
    formikProps.setFieldValue(fieldName, value);
    resetResult();
  };

  return (
    <Formik
      initialValues={{ testName: "", testResult: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const result = onSubmit(values);
        if (result) actions.setFieldValue("testName", result.name);
      }}
    >
      {(props) => (
        <>
          <AppInput
            placeholder="Test Name"
            value={props.testName}
            onChangeText={(value) => handleChange(props, "testName", value)}
            onBlur={props.handleBlur("testName")}
            value={props.values.testName}
          />
          <Text>{props.touched.testName && props.errors.testName}</Text>
          <AppInput
            placeholder="Result"
            value={props.testResult}
            onChangeText={(value) => handleChange(props, "testResult", value)}
            onBlur={props.handleBlur("testResult")}
            value={props.values.testResult}
            keyboardType="phone-pad"
          />
          <Text>{props.touched.testResult && props.errors.testResult}</Text>
          <Button
            title="Check"
            accessibilityLabel="Check test results"
            onPress={props.handleSubmit}
          />
        </>
      )}
    </Formik>
  );
}
