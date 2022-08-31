import { Image,StyleSheet } from "react-native";


function Avatar({source}){
    return(
        <Image source={source} style={[styles.avatar,{width:"30%"}]}/>
    )
}

const styles = StyleSheet.create({
    avatar:{
        borderRadius: 50,
        borderWidth: 2,
        height: "auto",
        aspectRatio: 1/1
    }
})
export default Avatar