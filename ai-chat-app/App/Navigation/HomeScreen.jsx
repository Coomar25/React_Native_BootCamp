import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChatScreen from "../Pages/ChatScreen";

const Stack = createNativeStackNavigator();
const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="/">
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
export default HomeScreen;
