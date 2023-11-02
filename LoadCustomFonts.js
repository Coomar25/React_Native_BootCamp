import * as Font from 'expo-font';

export async function loadCustomFonts() {
  await Font.loadAsync({
    'FuzzyBubbles-Bold': require('./assets/fonts/FuzzyBubbles-Bold.ttf'),
    'FuzzyBubbles-Regular': require('./assets/fonts/FuzzyBubbles-Regular.ttf'),
    'PlaypenSans-ExtraBold': require('./assets/fonts/PlaypenSans-ExtraBold.ttf'),
    'PlaypenSans-ExtraLight': require('./assets/fonts/PlaypenSans-ExtraLight.ttf'),
    'PlaypenSans-Light': require('./assets/fonts/PlaypenSans-Light.ttf'),
    'PlaypenSans-Medium': require('./assets/fonts/PlaypenSans-Medium.ttf'),
    'PlaypenSans-Regular': require('./assets/fonts/PlaypenSans-Regular.ttf'),
    'PlaypenSans-SemiBold': require('./assets/fonts/PlaypenSans-SemiBold.ttf'),
    'PlaypenSans-Thin': require('./assets/fonts/PlaypenSans-Thin.ttf'),
  });
}
