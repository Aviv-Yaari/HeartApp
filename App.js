import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import fuzzysort from "fuzzysort";
import LottieView from "lottie-react-native";
import { AppTitle } from "./components/AppTitle";
import { BloodtestForm } from "./components/BloodtestForm";
import { FinalResult } from "./components/FinalResult";

// import DUMMY_DATA from "./dummydata"; // for dev

export default function App() {
  const [testConfig, setTestConfig] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadTestConfig = async () => {
      try {
        const url =
          "https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json";
        const res = await axios.get(url);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
        setTestConfig(res.data.bloodTestConfig);
        // setTestConfig(DUMMY_DATA.bloodTestConfig); // for dev:
      } catch (err) {
        console.error(err);
        setError(err);
        // TODO - show error message with snackbar or something
      }
    };
    loadTestConfig();
  }, []);

  const getNameSuggestions = (value) =>
    fuzzysort.go(value, testConfig, { key: "name" }).slice(0, 5);

  const handleCheck = (values) => {
    const { testName, testResult } = values;
    const results = getNameSuggestions(testName);
    const result = results.length && results[0].obj;
    if (result) setResult({ ...result, testResult });
    else setResult({ name: "Unknown" });
    return result;
  };

  const resetResult = () => result && setResult(null);

  if (error)
    return (
      <View style={styles.container}>
        <AppTitle>Oops!</AppTitle>
        <Text style={{ textAlign: "center" }}>
          an error occured. Please try again later.
        </Text>
      </View>
    );

  if (!testConfig)
    return (
      <View style={styles.spinnerContainer}>
        <LottieView
          source={require("./assets/lottie/heart.json")}
          style={styles.spinner}
          autoPlay
        />
      </View>
    );

  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <LottieView
            source={require("./assets/lottie/background.json")}
            style={styles.backgroundAnimation}
            autoPlay={true}
            loop={true}
          />
          <Animatable.Text
            animation="pulse"
            iterationCount="infinite"
            easing="ease-in-out"
            iterationDelay={4000}
            duration={2000}
            style={{ textAlign: "center", marginVertical: 20 }}
          >
            <AppTitle>Am I OK?</AppTitle>
          </Animatable.Text>
          <BloodtestForm
            onSubmit={handleCheck}
            resetResult={resetResult}
            getNameSuggestions={getNameSuggestions}
          />
          {result && <FinalResult result={result} />}
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 50,
  },
  spinnerContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  spinner: {
    width: 150,
    height: 150,
  },
  backgroundAnimation: {
    position: "absolute",
    top: 0,
    bottom: -320,
    left: 0,
    right: 0,
    backgroundColor: "#D1E8E4",
  },
});
