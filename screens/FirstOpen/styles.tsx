import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    borderWidth: 10,
    borderColor: "white",
    borderTopWidth: 0,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 100 + "%",
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
  },
  Logo: {
    resizeMode: "contain",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
  },
  topLottie: {
    width: 95 + "%",
    height: "auto",
    backgroundColor: "transparent",
    top: 0,
  },
  FormInput: {
    height: 20 + "%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  InputContainer: {
    borderRadius: 50,
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderWidth: 1,
    width: 80 + "%",
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "space-between",
  },
  InputLeftImageBox: {
    backgroundColor: "#fff",
    borderRadius: 100,
    padding: 10,
  },
  InputLeftImage: {
    width: 30,
    height: 30,
  },
  InputText: {
    width: 80 + "%",
    color: "#fff",
    fontSize: 18,
    fontFamily: "Kalameh",
  },
  FormButton: {
    borderRadius: 30,
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
  },
  FormButtonText: {
    fontSize: 18,
    color: "#fc2e2e",
    textAlign: "center",
    fontFamily: "Kalameh",
  },
});
