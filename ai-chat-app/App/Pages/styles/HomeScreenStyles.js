// styles

import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 90,
  },
  textSM: {
    color: "#E53057",
    fontWeight: "bold",
    fontSize: 35,
  },
  chatFaceImage: {
    height: 200,
    width: 200,
    marginTop: 20,
  },

  avatarIcons: {
    marginTop: 50,
    width: "100%",
    height: 80,
    borderRadius: 40,
    alignItems: "center",
  },

  listsofchatFaceImage: {
    alignItems: "center",
    height: 60,
    width: 60,
    marginTop: 10,
  },

  touchableImageIcons: {
    alignItems: "center",
    marginRight: 5,
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: "#4b2b35",
  },

  OkeyBtn: {
    width: Dimensions.get("screen").width * 0.8,
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 30,
  },
});
