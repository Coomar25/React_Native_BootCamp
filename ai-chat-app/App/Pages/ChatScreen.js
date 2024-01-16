import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { getBardApi } from "../Services/GlobalApi";

const ChatScreen = () => {
  const params = useRoute().params;
  const [messages, setMessages] = useState([]);
  const [selectedface, setSelectedface] = useState([]);

  useEffect(() => {
    setSelectedface(params.selectedface);
    console.log(selectedface);

    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: selectedface.id,
          name: selectedface.image,
          avatar: selectedface.image,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    if (messages[0].text) {
      getBardResponse(messages[0].text);
    }
  }, []);

  const getBardResponse = async (questions) => {
    const response = await getBardApi(questions);
    // console.log(response);
  };

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
};
export default ChatScreen;
