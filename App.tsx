import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HomeScreen, NewPostScreen } from './src/screens';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* <HomeScreen /> */}
      <NewPostScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
