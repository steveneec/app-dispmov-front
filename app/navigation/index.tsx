import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Networks from "../screens/Networks";
import Posts from "../screens/Posts";
import Users from "../screens/Users";
import GPT from "../screens/GPT";

const Tab = createBottomTabNavigator();

export default function Navigation(){
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({route}) => 
            ({headerShown: false,
                tabBarIcon: (({focused, color, size}) => {
                    let iconName;
                    if (route.name === "NETWORKS") {
                        iconName = "apps"
                    }
                    if(route.name === "POSTS"){
                        iconName = "shapes"
                    }
                    if(route.name === "USERS"){
                        iconName = "people"
                    }
                    if(route.name === "GPT"){
                        iconName = "chatbubbles"
                    }
                    //@ts-ignore
                    return <Ionicons name={iconName} size={size} color={color}/>
                })
            })}>
                <Tab.Screen name="NETWORKS" component={Networks} />
                <Tab.Screen name="POSTS" component={Posts}/>
                <Tab.Screen name="USERS" component={Users} />
                <Tab.Screen name="GPT" component={GPT}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}