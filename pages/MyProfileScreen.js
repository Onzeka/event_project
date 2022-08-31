import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Avatar from '../features/user/Avatar';
import EventGrid from '../features/event/EventGrid';
import UserGrid from '../features/user/UserGrid';



const myData = {
    name: "Emilien Grillot",
    username: "Cerisegrillotte",
    bio: "go muscu",
    eventsCount : 58,
    friendsCount : 589,
    profilePicture: require('root/assets/user.jpg'),
    friends : [
        {name:"Enzo"},
        {name: "Raph"},
        {name: "Edina"},
        {name: "Elena"},
        {name: "Gregoire"}
    ],
    events: [
        {title:"TLO",id:1},
        {title:'GR',id:2},
        {title: "Techno Parade",id:3},
        {title: "kermesse",id:4},
        {title: "reveil des prez",id:5},
        {title: "Emotys",id:6},
        {title: "clubB",id:7},
        {title: "couscous Muslimint",id:8}
    ]

    
}


const {height,width} = Dimensions.get('window')

const Tab = createMaterialTopTabNavigator()

export default function MyProfileScreen(){
    
    return(
        <View style={{flex:1, height}}>
        <FlatList
        data={[1]}
        renderItem={(item)=>{
            return(
            <View style={{flex:1}}>
                <View style={styles.container}>
                    <Avatar source={myData.profilePicture}/>
                    <Text> {myData.name}</Text>
                    <Text> {myData.bio}</Text>
                    <View style={[styles.container,{flexDirection:"row"}]}>
                        <View style={styles.statview}>
                            <Text>Events</Text>
                            <Text>{myData.eventsCount}</Text>
                        </View>
                        <View style={styles.statview}>
                            <Text>Friends</Text>
                            <Text>{myData.friendsCount}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1,height: 0.9*height}}>
                    <Tab.Navigator>
                        <Tab.Screen name='events' component={EventGrid}/>
                        <Tab.Screen name='friend' component={UserGrid}/>
                    </Tab.Navigator>

                </View>
                </View>)}}
            />
            </View>
            
    )
}





const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "auto",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      
    },
    statview: {
        flex: 1,
        height: "auto",
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    }
  });