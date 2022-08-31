import { StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeScreen(){
    return(
        <View style={styles.container} >
            <Text style= {{fontWeight:"700",fontSize:24,letterSpacing: 0.15}}>HomeScreen</Text>
            <FontAwesome name="home" size={32}/>
            
        </View>
    )
}





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 10
    }
  });