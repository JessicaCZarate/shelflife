import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Entypo from "@expo/vector-icons/Entypo";
import { Colors } from "@/constants/Colors";
import PrimaryButton from "../PrimaryButton";

type UploadImageProps = {
  setImageUri: React.Dispatch<React.SetStateAction<ImagePicker.ImagePickerAsset | undefined>>;
};

export default function UploadImage(props: UploadImageProps) {
  const [image, setImage] = useState<string>(
    "https://ircsan.com/wp-content/uploads/2024/03/placeholder-image.png"
  );
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      props.setImageUri(result.assets[0]);
    }
  };

  async function launchCamera() {
    const { status } = await requestPermission();

    if (status !== "granted") return alert("Please grant permission");

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      cameraType: ImagePicker.CameraType.back,
      base64: true,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      props.setImageUri(result.assets[0]);
    }
  }

  return (
    <View style={{ marginBottom: 30, marginTop: 18 }}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={{
            uri: image,
          }}
          style={styles.imageBackgroud}
        >
          <View style={{ backgroundColor: "#ffffff66", borderRadius: 12 }}>
            <PrimaryButton
              title="Upload Image"
              variant="outline"
              fontSize={14}
              onPress={pickImage}
            />
          </View>
        </ImageBackground>
      </View>
      <TouchableOpacity
        onPress={launchCamera}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
          marginLeft: "auto",
          marginTop: 8,
        }}
      >
        <Entypo name="camera" size={24} color="black" />
        <Text
          style={{
            fontFamily: "Poppins-Medium",
            height: 18,
          }}
        >
          Use Camera
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    overflow: "hidden",
    minWidth: 300,
    height: 200,
    borderRadius: 10,
  },
  imageBackgroud: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: 8,
    backgroundColor: Colors.lightGray,
    borderRadius: 10,
  },
});
