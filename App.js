import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import fuzzysort from "fuzzysort";
import { AppInput } from "./components/AppInput";
import { AppTitle } from "./components/AppTitle";
import { BloodtestForm } from "./components/BloodtestForm";
import { FinalResult } from "./components/FinalResult";

const DUMMY_DATA = {
  bloodTestConfig: [
    {
      name: "HDL Cholesterol",
      threshold: 40,
    },
    {
      name: "LDL Cholesterol",
      threshold: 100,
    },
    {
      name: "A1C",
      threshold: 4,
    },
  ],
};

export default function App() {
  const [testConfig, setTestConfig] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadTestConfig = async () => {
      try {
        // const url =
        //   "https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json";
        // const res = await axios.get(url);
        // setTestConfig(res.data.bloodTestConfig);
        setTestConfig(DUMMY_DATA.bloodTestConfig);
      } catch (err) {
        console.error(err);
        setError(err);
        // TODO - show error message with snackbar or something
      }
    };
    loadTestConfig();
  }, []);

  const handleCheck = (values) => {
    const { testName, testResult } = values;
    const results = fuzzysort.go(testName, testConfig, { key: "name" });
    const result = results.length && results[0].obj;
    if (result) setResult({ ...result, testResult });
    else setResult({ name: "Unknown" });
    return result;
  };

  const resetResult = () => result && setResult(null);

  return (
    <View style={styles.container}>
      <AppTitle>Am I OK?</AppTitle>
      <BloodtestForm onSubmit={handleCheck} resetResult={resetResult} />
      {result && <FinalResult result={result} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 50,
    marginVertical: 50,
  },
});
