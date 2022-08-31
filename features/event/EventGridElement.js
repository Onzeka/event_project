import { Dimensions, StyleSheet, Text, View } from "react-native";



function EventGridElement({event}){
    return(
        <View style={styles.container} >
            <Text>{event.title}</Text>
        </View>
    )
    
}

styles = StyleSheet.create({
    container:{
        width: '30%',
        height: "auto",
        aspectRatio:1/1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "blue"
    },
})

export default EventGridElement

