import { StyleSheet, Text, View } from 'react-native';


export default function ExploreScreen(){
    return(
        <View style={styles.container}>
            <Text>ExploreScreen</Text>
        </View>
    )
}





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });