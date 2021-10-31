import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { mindeeService } from '../services/mindee.service';
import { View } from 'react-native-animatable';

export function UploadActions({ handleCheckResult, setValues, setIsLoading }) {
  const handleUploadImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        quality: 1,
      });
      if (result.cancelled) return;
      setIsLoading(true);
      const base64Img = `data:image/jpg;base64,${result.base64}`;
      const prediction = await mindeeService.getOCR(base64Img);
      const bestSuggestion = handleCheckResult({ testName: prediction.test_name, testResult: prediction.test_result });
      setValues({ testName: bestSuggestion?.name || prediction.test_name, testResult: prediction.test_result });
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.uploadActions}>
      <Pressable onPress={handleUploadImage}>
        <Text>Upload</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
