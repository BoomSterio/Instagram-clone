import { SafeAreaView, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { Header } from './components/Header';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})
