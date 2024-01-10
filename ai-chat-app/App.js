import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./App/Navigation/Navigation";
export default function App() {
  return (
    <View>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </View>
  );
}
