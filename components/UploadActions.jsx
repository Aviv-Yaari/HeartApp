import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { cloudinaryService } from "../services/cloudinary.service";
import { mindeeService } from "../services/mindee.service";
import { View } from "react-native-animatable";

export function UploadActions({ handleCheckResult }) {
  const handleUploadImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        quality: 1,
      });
      if (result.cancelled) return;
      const base64Img = `data:image/jpg;base64,${result.base64}`;
      const cloudinaryImgUrl = await cloudinaryService.uploadImg(base64Img);
      const prediction = await mindeeService.getOCR(cloudinaryImgUrl);
      handleCheckResult({ testName: prediction.test_name, testResult: prediction.test_result });
    } catch (err) {
      console.error(err);
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
