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


import AsyncStorage from "@react-native-async-storage/async-storage";

import * as ImagePicker from "expo-image-picker";

/**
 * Default images import
 */
import defaultFrontImage from "../../assets/image/Front.jpg";
import defaultEdgeImage from "../../assets/image/Kenar.jpg";

export default function ImagePickerExample() {
  /**
   * Default images
   */
  const [imageFront, setImageFront] = useState({
    uri: Image.resolveAssetSource(defaultFrontImage).uri,
  });
  const [imageEdge, setImageEdge] = useState({
    uri: Image.resolveAssetSource(defaultEdgeImage).uri,
  });

  /**
   * Modal
   */
  // Choose modal
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  // Upload Status modal
  const [Uploadvisible, setUploadVisible] = React.useState(false);
  const [UploadText, setUploadText] = React.useState("");
  const showUploadModal = () => setUploadVisible(true);
  const hideUploadModal = () => setUploadVisible(false);

  // Modals style
  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    width: 80 + "%",
    marginLeft: 10 + "%",
    borderRadius: 5,
  };

  /**
   * Backend Jobs
   */
  // Choose pick from gallery or camera
  const [chooseInput, setChooseInput] = React.useState("");

  // Check if send button must show or not
  const [showSendButton, setShowSendButton] = React.useState(false);
  // Check if both images picked or not
  const [choosedImages, setChoosedImages] = React.useState([
    0, // Edge
    0, // Front
  ]);

  // Access Permissions
  useEffect(() => {
    (async () => {
      // Files Permission
      var { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("برای دسترسی به تصاویر به مجوز شما نیاز داریم!");
      }
      // Camera Permission
      var { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("برای گرفتن عکس به مجوز شما نیاز داریم!");
      }
    })();
  }, []);

  // Pick Image
  const pickImage = async (chooseSide) => {
    if (chooseInput == "Camera") {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
        aspect: [1, 2],
      });
    } else if (chooseInput == "Gallery") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 0.5,
        aspect: [1, 2],
      });

      if (!result.cancelled) {
        let cia = choosedImages;
        if (chooseSide == "Edge") {
          cia[0] = 1;
          setChoosedImages(cia);

          setImageEdge(result);
        } else if (chooseSide == "Front") {
          cia[1] = 1;
          setChoosedImages(cia);

          setImageFront(result);
        }
      }
    }

    // Show upload button
    showUploadButton();
  };

  /**
   * Show upload button if both pictures selected
   */
  const showUploadButton = () => {
    const cia = choosedImages;
    if (cia[0] && cia[1]) {
      setShowSendButton(true);
    }
  };

  /**
   * Upload the images
   */
  let uploadimage = async () => {
    setUploadText("در حال ارسال ، لطفا صبر کنید...");
    showUploadModal();

    const PHONE_NUMBER = await AsyncStorage.getItem("@phone");

    var check = 1;
    var remains = 0;

    for (var i = 0; i <= 1; i++) {
      
      // Switch between front and edge images
      if (!i) {
        var image = imageFront;
        var side = "front";
      } else {
        var image = imageEdge;
        var side = "edge";
      }

      // Get image attrs
      let localUri = image.uri;
      let fileName = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(fileName);
      let type = match ? `image/${match[1]}` : `image`;
      let sendWithThisName = PHONE_NUMBER + "-" + side + "." + match[1];

      //If file selected then create FormData
      var fileToUpload = {
        uri: localUri,
        name: sendWithThisName,
        type: type,
      };
      var data = new FormData();
      data.append("file", fileToUpload);

      // Send phone number
      data.append("phone", PHONE_NUMBER);

      // Upload Data
      try {
        let res = await fetch(
          //FIXME Correct this address
          "http://192.168.1.107:8000/customer/data/upload-file",
          {
            method: "post",
            body: data,
            headers: {
              "Content-Type": "multipart/form-data; ",
            },
          }
        );
        let responseJson = await res.json();

          if(responseJson.status == 2){
            check = 2;
            remains = responseJson.remain;
            break;
          }

      } catch (error) {
        check = 0;
        break;
      }
    }
    if (check == 1) {
      setUploadText("تصاویر با موفقیت ارسال شدند.");
    }else if(check == 2){
      setUploadText(`شما قبلا تصاویر این دوره زمانی را ارسال فرموده‌اید.\nلطفا ${remains} روز دیگر مراجعه فرمایید.`);
    }else {
      setUploadText("مشکلی در ارسال تصاویر به وجود آمد! لطفا مجددا تلاش کنید.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <TouchableOpacity
            style={styles.modalChoice}
            onPress={() => {
              hideModal();
              pickImage("Edge");
            }}
          >
            <Text style={styles.modalChoiceText}>عکس از بغل</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalChoice}
            onPress={() => {
              hideModal();
              pickImage("Front");
            }}
          >
            <Text style={styles.modalChoiceText}>عکس از رو به رو</Text>
          </TouchableOpacity>
        </Modal>

        {/* Sending text modal */}
        <Modal
          visible={Uploadvisible}
          onDismiss={hideUploadModal}
          contentContainerStyle={containerStyle}
        >
          <Text>{UploadText}</Text>
        </Modal>
      </Portal>

      <View style={styles.topHelp}>
        <Text style={styles.topHelpText}>
          در این صفحه می‌توانید در دوره‌های بیست روزه ، تصاویر خود را ثبت کنید
          تا برای مشاور ارسال شود.
          {"\n"}
          پس از انتخاب هر دو عکس ، گزینه ارسال فعال می‌شود.
        </Text>
      </View>
      <View style={styles.topContainer}>
        <Image source={{ uri: imageFront.uri }} style={styles.imageTop} />
        <Image source={{ uri: imageEdge.uri }} style={styles.imageTop} />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          theme={{ roundness: 5 }}
          mode="contained"
          icon="image-multiple-outline"
          style={styles.buttonPick}
          onPress={() => {
            showModal();
            setChooseInput("Gallery");
          }}
        >
          انتخاب از گالری
        </Button>
        <Button
          theme={{ roundness: 5 }}
          mode="contained"
          icon="camera-enhance-outline"
          style={[styles.buttonPick, styles.cameraButton]}
          onPress={() => {
            showModal();
            setChooseInput("Camera");
          }}
        >
          گرفتن عکس
        </Button>
      </View>
      {showSendButton && (
        <View style={styles.buttonSendContainer}>
          <Button
            theme={{ roundness: 5 }}
            mode="contained"
            icon="send-check-outline"
            style={[styles.buttonSend]}
            onPress={uploadimage}
          >
            ارسال تصاویر
          </Button>
        </View>
      )}
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
    height: 100 + "%",
    resizeMode: "center",
    borderRadius: 10,
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

  buttonSendContainer: {
    marginTop: 10,
    width: 95 + "%",
  },
  buttonSend: {
    width: 100 + "%",
    backgroundColor: "rgba(100,150,100,1)",
  },
});
