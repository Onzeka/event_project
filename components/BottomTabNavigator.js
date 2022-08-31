import react from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome'
//Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Screens
import { CreateEventScreen,HomeScreen,MyProfileScreen,ExploreScreen,SearchScreen } from "../pages";


const Tab = createBottomTabNavigator()



export default function BottomTabNavigator(){
    return(
        <Tab.Navigator 
            screenOptions={{tabBarShowLabel: false}}
        >
            <Tab.Screen 
                name = "Home" 
                component={HomeScreen}
                options={{
                    tabBarIcon:({color,size}) =>(
                        <FontAwesome name="home" color={color} size={size}/>
                    )
                }}
            />
            <Tab.Screen name = "Explore" 
                component={ExploreScreen}
                
            />
            <Tab.Screen name = "CreateEvent" component={CreateEventScreen}/>
            <Tab.Screen name = "SearchScreen" component={SearchScreen}/>
            <Tab.Screen name = "MyProfile" component={MyProfileScreen}/>
        </Tab.Navigator>
    )
}
