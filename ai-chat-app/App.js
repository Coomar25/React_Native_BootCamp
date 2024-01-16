import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./App/Navigation/Navigation";
import HomeScreen from "./App/Pages/HomeScreen";
export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
