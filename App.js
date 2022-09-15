import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { AppNavigator } from './src/app.navigator';

const App = () => {

  return (
    <SafeAreaView style={styles.root}>
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;