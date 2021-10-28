import React from 'react';
import {StatusBar, SafeAreaView, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, Card, Image, Button, ActionBar} from 'react-native-ui-lib';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function Dashboard_EventCard({ style, image, name, description }) {
  let cardStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    height: 100,
  };

  return (
    <TouchableOpacity style={style}>
      <Card borderRadius={10} style={cardStyle} enableShadow={true}>
        <Image style={{height: 100, width: 100}} borderTopLeftRadius={10} borderBottomLeftRadius={10} source={image} resizeMode="cover" />
        <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
          <Text style={{paddingVertical: 5}} text60BL center={true}>{name}</Text>
          <Text style={{paddingVertical: 5}} text70 center={true}>{description}</Text>              
        </View>
      </Card>
    </TouchableOpacity>
  );
}

function Dashboard_StatusList() {
  const eventData = [
    {image: require('./assets/moon.jpg'), name: "Moon Landing Skeptics", description: "11/17/2021"},
    {image: require('./assets/ussr.png'), name: "Communist Reunion",     description: "11/23/2021"},
  ];

  return (
    <ScrollView>
    {
      eventData.map((e, i) => {
        return <Dashboard_EventCard key={i} style={{ paddingTop: i != 0 ? 20 : 0 }} image={e.image} name={e.name} description={e.description} />
      })
    }
    </ScrollView>
  );
}

function Dashboard_Status() {
  return (<></>);
}

function Dashboard() {
  const items = [
    { name: "Your Status",     func: Dashboard_Status     },
    { name: "Upcoming Events", func: Dashboard_StatusList }
  ];

  return (
    <ScrollView style={{backgroundColor: "white"}}>
      {
        items.map((e, i) => {
          return (
            <View key={i}>
              <Text text50 heading style={{paddingVertical: 10}}>{e.name}</Text>
              {e.func()}
            </View>
          );
        })
      }
    </ScrollView>
  );
}

function App_BottomNavbar() {
  return (
    <ActionBar actions={[{
      label: "Dashboard"
    }]} useSafeArea={true}></ActionBar>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex:1, backgroundColor:"black" }}>
        <View flex padding-page backgroundColor="white" style={{ paddingHorizontal: 25, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}>
          <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Dashboard">
            <Stack.Screen name="Dashboard" component={Dashboard}/>
          </Stack.Navigator>
          {App_BottomNavbar()}
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
}