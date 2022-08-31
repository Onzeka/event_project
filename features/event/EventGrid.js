import { FlatList, View } from "react-native"
import EventGridElement from "./EventGridElement"

const events = [
    {title:"TLO",id:1},
    {title:'GR',id:2},
    {title: "Techno Parade",id:3},
    {title: "kermesse",id:4},
    {title: "reveil des prez",id:5},
    {title: "Emotys",id:6},
    {title: "clubB",id:7},
    {title: "couscous Muslimint",id:8}
]


function EventGrid(){
    return(
        <View style={{flex:1}}>
            <FlatList 
            data={events}
            keyExtractor={(item)=>item.id}
            renderItem={(item)=><EventGridElement event={item}/>}
            />
        </View>
    )
}
export default EventGrid