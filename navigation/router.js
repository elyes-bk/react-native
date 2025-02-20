import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ProductStack from "./productStack";
import Add from "../screen/Add";

const Tabs = createBottomTabNavigator();

export default function AppNavigation() {
    return(
        <NavigationContainer>
            <Tabs.Navigator>
                <Tabs.Screen name='Home' component={ProductStack} options={{headerShown: false}}/>
                <Tabs.Screen name='Add' component={Add} />
            </Tabs.Navigator>
        </NavigationContainer>
    )
};