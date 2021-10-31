import React, { useEffect, useState } from "react";
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import * as Animatable from "react-native-animatable";
import axios from "axios";
import fuzzysort from "fuzzysort";
import LottieView from "lottie-react-native";
import { AppTitle } from "./components/AppTitle";
import { BloodtestForm } from "./components/BloodtestForm";
import { FinalResult } from "./components/FinalResult";
import LoadingAnimation from "./assets/lottie/heart.json";
import BackgroundAnimation from "./assets/lottie/background.json";
// import DUMMY_DATA from "./dummydata"; // for dev purposes

export default function App() {
  const [testConfig, setTestConfig] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const loadTestConfig = async () => {
      try {
        const url = "https://s3.amazonaws.com/s3.helloheart.home.assignment/bloodTestConfig.json";
        const res = await axios.get(url);
        await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay
        setTestConfig(res.data.bloodTestConfig);
        // setTestConfig(DUMMY_DATA.bloodTestConfig); // for dev purposes:
      } catch (err) {
        console.error(err);
        setError(err);
      }
    };
    loadTestConfig();
  }, []);

  const getNameSuggestions = (query) => {
    const words = query.match(/[a-z'\-]+/gi) || [];
    const options = {
      key: "name",
      allowTypo: true,
      limit: 3,
    };
    const results = words.map((word) => fuzzysort.go(word, testConfig, options)); // search each word separately
    results.push(fuzzysort.go(query, testConfig, options)); // search entire sentence
    const map = {};
    return results
      .flat()
      .sort((a, b) => b.score - a.score)
      .sort((a, b) => b.indexes.length - a.indexes.length) // sort by scores, then by common letters
      .filter(
        (result) => (map.hasOwnProperty(result.target) ? false : (map[result.target] = true)) // remove duplicates
      );
  };

  const handleCheckResult = (values) => {
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
        <AppTitle>Oops! An error occured</AppTitle>
        <Text style={{ textAlign: "center" }}>Please try again later.</Text>
      </View>
    );

  if (!testConfig)
    return (
      <View style={styles.loadingContainer}>
        <LottieView source={LoadingAnimation} style={styles.loadingSpinner} autoPlay />
      </View>
    );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <LottieView
          source={BackgroundAnimation}
          style={styles.backgroundAnimation}
          autoPlay={true}
          loop={true}
        />
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          easing="ease-in-out"
          iterationDelay={2000}
          duration={2000}
          style={{ textAlign: "center", marginVertical: 20 }}
        >
          <AppTitle>Am I OK?</AppTitle>
        </Animatable.Text>
        <BloodtestForm
          onSubmit={handleCheckResult}
          resetResult={resetResult}
          getNameSuggestions={getNameSuggestions}
        />
        {result && <FinalResult result={result} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 50,
    backgroundColor: "#D1E8E4",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  loadingSpinner: {
    width: 150,
    height: 150,
  },
  backgroundAnimation: {
    position: "absolute",
    top: 0,
    bottom: -320,
    left: 0,
    right: 0,
  },
});
