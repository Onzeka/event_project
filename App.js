import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { AppNavigator } from './src/app.navigator';
import Permission from './src/app.permissions';

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