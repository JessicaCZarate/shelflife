import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import PrimaryButton from "../PrimaryButton";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function UploadImage() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        minWidth: 300,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.lightGray,
        height: 150,
        gap: 8,
        borderRadius: 10,
        marginBottom: 30,
      }}
    >
      <PrimaryButton title="Upload Image" variant="solid" onPress={() => {}} />
      <PrimaryButton title="Use Camera" variant="outline" onPress={pickImage} />
    </View>
  );
}

const styles = StyleSheet.create({});
