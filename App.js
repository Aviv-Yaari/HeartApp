import React, { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { AppTitle } from './components/AppTitle';
import { BloodtestForm } from './components/BloodtestForm';
import { TestAnswer } from './components/TestAnswer';
import LoadingAnimation from './assets/lottie/heart.json';
import BackgroundAnimation from './assets/lottie/background.json';
import { UploadActions } from './components/UploadActions';
import { bloodTestService } from './services/blood-test.service';

export default function App() {
  const [testConfig, setTestConfig] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ testName: '', testResult: '' });
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    const loadTestConfig = async () => {
      try {
        const config = await bloodTestService.getConfig();
        setTestConfig(config);
      } catch (err) {
        setError(err);
      }
    };
    loadTestConfig();
  }, []);

  const getNameSuggestions = query => {
    const results = bloodTestService.getTestNameSuggestions(query, testConfig);
    return results;
  };

  const handleCheckResult = values => {
    const { testName, testResult } = values;
    const suggestions = getNameSuggestions(testName);
    const bestSuggestion = suggestions.length && suggestions[0].obj;
    if (bestSuggestion) setAnswer({ ...bestSuggestion, testResult });
    else setAnswer({ name: 'Unknown' });
    return bestSuggestion;
  };

  const resetAnswer = () => answer && setAnswer(null);

  const resetValues = () => setValues({ testName: '', testResult: '' });

  if (error)
    return (
      <View style={styles.container}>
        <AppTitle>Oops! An error occured</AppTitle>
        <Text style={{ textAlign: 'center' }}>Please try again later.</Text>
      </View>
    );

  if (!testConfig || isLoading)
    return (
      <View style={styles.loadingContainer}>
        <LottieView source={LoadingAnimation} style={styles.loadingSpinner} autoPlay />
      </View>
    );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <LottieView source={BackgroundAnimation} style={styles.backgroundAnimation} autoPlay={true} loop={true} />
        <UploadActions handleCheckResult={handleCheckResult} setValues={setValues} setIsLoading={setIsLoading} />
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          easing="ease-in-out"
          iterationDelay={2000}
          duration={2000}
          style={{ textAlign: 'center', marginVertical: 20 }}>
          <AppTitle>Am I OK?</AppTitle>
        </Animatable.Text>
        <BloodtestForm
          values={values}
          resetValues={resetValues}
          onSubmit={handleCheckResult}
          resetAnswer={resetAnswer}
          getNameSuggestions={getNameSuggestions}
        />
        {answer && <TestAnswer answer={answer} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#D1E8E4',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingSpinner: {
    width: 150,
    height: 150,
  },
  backgroundAnimation: {
    position: 'absolute',
    top: 0,
    bottom: -320,
    left: 0,
    right: 0,
  },
});
