import { StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import React from "react";
import { CameraView } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setBarCode: React.Dispatch<React.SetStateAction<string>>;
  trigger: React.Dispatch<React.SetStateAction<number>>;
};

export default function ScannerModal(prop: Props) {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={prop.modalVisible}
        onRequestClose={() => {
          prop.setModalVisible(!prop.modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000b8",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", right: 20, top: 20 }}
            onPress={() => prop.setModalVisible(false)}
          >
            <Ionicons name="close" size={24} color="white" />
          </TouchableOpacity>
          <CameraView
            style={styles.camera}
            facing={"back"}
            onBarcodeScanned={(result) => {
              if (result.raw) {
                prop.setBarCode(result.raw);
              }

              prop.setModalVisible(false);
              prop.trigger((prev) => prev + 1);
            }}
          ></CameraView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: 300,
    height: 200,
  },
});
