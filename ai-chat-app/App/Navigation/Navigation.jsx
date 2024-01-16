import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Pages/HomeScreen";
import ChatScreen from "../Pages/ChatScreen";

const Stack = createNativeStackNavigator();
const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="chat" component={ChatScreen} />
    </Stack.Navigator>
  );
};
export default Navigation;
