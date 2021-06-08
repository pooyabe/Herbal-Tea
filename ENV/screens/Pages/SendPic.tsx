import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  Platform,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Modal, Portal, Button, Provider } from "react-native-paper";

import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample() {
  /**
   * Default images
   */
  const [imageUri, setImageUri] = useState([
    require("../../assets/image/Front.jpg"),
    require("../../assets/image/Kenar.jpg"),
  ]);

  /**
   * Modal
   */
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: 80 + "%",
    marginLeft: 10 + "%",
    borderRadius: 5
  };

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <TouchableOpacity style={styles.modalChoice}>
            <Text style={styles.modalChoiceText}>عکس از بغل</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalChoice}>
            <Text style={styles.modalChoiceText}>عکس از رو به رو</Text>
          </TouchableOpacity>
        </Modal>
      </Portal>

      <View style={styles.topHelp}>
        <Text style={styles.topHelpText}>
          در این صفحه می‌توانید در دوره‌های بیست روزه ، تصاویر خود را ثبت کنید
          تا برای مشاور ارسال شود.
        </Text>
      </View>
      <View style={styles.topContainer}>
        <Image source={imageUri[0]} style={styles.imageTop} />
        <Image source={imageUri[1]} style={styles.imageTop} />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          theme={{ roundness: 5 }}
          mode="contained"
          icon="image-multiple-outline"
          style={styles.buttonPick}
          onPress={showModal}
        >
          انتخاب از گالری
        </Button>
        <Button
          theme={{ roundness: 5 }}
          mode="contained"
          icon="camera-enhance-outline"
          style={[styles.buttonPick, styles.cameraButton]}
          onPress={showModal}
        >
          گرفتن عکس
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(250,250,250,0.1)",
    paddingTop: 10,
    paddingBottom: 10,
  },
  topHelp: {
    width: 95 + "%",
    backgroundColor: "rgb(250,100,100)",
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  topHelpText: {
    color: "#ffffff",
    fontFamily: "Kalameh",
    fontSize: 15,
  },
  topContainer: {
    flex: 1.5,
    width: 100 + "%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingTop: 5,
    justifyContent: "space-around",
    overflow: "hidden",
  },
  imageTop: {
    width: 50 + "%",
    resizeMode: "center",
    borderRadius: 10
  },
  bottomContainer: {
    width: 95 + "%",
    paddingTop: 5 + "%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonPick: {
    width: 49 + "%",
  },
  cameraButton: {
    backgroundColor: "rgb(100,150,250)",
  },

  modalChoice: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  modalChoiceText: {
    fontFamily: "Kalameh",
    fontSize: 15,
  },
});
