import React, { useState, useEffect } from "react";
import { Button, Image, View, Platform, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  let uploadimage = async () => {
    //Check if any file is selected or not
    if (image != null) {
      setText("در حال ارسال");

      // Image data
      let localUri = image.uri;
      let fileName = localUri.split("/").pop();
      let match = /\.(\w+)$/.exec(fileName);
      let type = match ? `image/${match[1]}` : `image`;

      //If file selected then create FormData
      const fileToUpload = {
        uri: localUri,
        name: fileName,
        type: type,
      };
      const data = new FormData();
      data.append("file", fileToUpload);

      let res = await fetch(
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

      if (responseJson.status) {
        setText("ارسال موفقیت آمیز بود");
      } else {
        setText("ارسال با مشکل مواجه شد");
      }
    } else {
      //if no file selected the show alert
      alert("Please Select File first");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="SEND" onPress={uploadimage} />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{ width: 200, height: 200 }}
        />
      )}

      <Text>{text}</Text>
    </View>
  );
}
