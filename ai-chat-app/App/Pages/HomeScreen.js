import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import chatFaceData from "../Services/ChatFaceData";
import { styles } from "./styles/HomeScreenStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function HomeScreen() {
  const [chatfacedata, setChatfacedata] = useState([]);
  const [selectedchatfacedata, setSelectedchatfacedata] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    setChatfacedata(chatFaceData);
    setSelectedchatfacedata(chatFaceData[0]);
  }, []);

  const onChatFacePress = async (id) => {
    const arrayIndex = id - 1;
    setSelectedchatfacedata(chatfacedata[arrayIndex]);
    await AsyncStorage.setItem("chatItem", String(arrayIndex));
  };

  const pingServer = async () => {
    try {
      const response = await fetch(
        "http://10.0.2.2:8000/auth/bardapi/sdfasdfasd",
        {
          mode: "no-cors",
        }
      );
      if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data:", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[{ color: selectedchatfacedata.primary }, { fontSize: 30 }]}>
        Hello
      </Text>
      <Text style={styles.textSM}>I'm {selectedchatfacedata.name}</Text>
      <Image
        source={{ uri: selectedchatfacedata.image }}
        style={styles.chatFaceImage}
      />
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: selectedchatfacedata.primary,
        }}
      >
        How can i help you ?
      </Text>

      <View style={styles.avatarIcons}>
        <FlatList
          data={chatFaceData}
          horizontal={true}
          style={styles.listingOfImage}
          renderItem={({ item }) => (
            // item.id !== chatfacedata?.[0]?.id && (
            <>
              <TouchableOpacity
                style={styles.touchableImageIcons}
                underlayColor="#transparent"
                onPress={() => onChatFacePress(item.id)}
              >
                <Image
                  source={{ uri: item?.image }}
                  style={styles.listsofchatFaceImage}
                />
              </TouchableOpacity>
            </>
          )}
        />
      </View>
      <Text
        style={[
          { marginTop: 20, fontWeight: "bold", fontSize: 20, color: "#FFC107" },
        ]}
      >
        {" "}
        Choose your fav ChatBuddy
      </Text>

      <TouchableOpacity
        style={[
          styles.OkeyBtn,
          { backgroundColor: selectedchatfacedata.primary },
        ]}
        onPress={() =>
          navigation.navigate("chat", { selectedface: selectedchatfacedata })
        }
      >
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
          Okey! To Go
        </Text>
      </TouchableOpacity>
      {/* =================================================================================================== */}
      {/* =================================================================================================== */}
      {/* =================================================================================================== */}

      <TouchableOpacity
        style={[
          styles.OkeyBtn,
          { backgroundColor: selectedchatfacedata.primary },
        ]}
        onPress={pingServer}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold", color: "white" }}>
          Test Ping
        </Text>
      </TouchableOpacity>
    </View>
  );
}
