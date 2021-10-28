import React from 'react';
import {StatusBar, SafeAreaView, Platform, Linking, TouchableOpacity, ScrollView} from 'react-native';
import {NavigationContainer,useNavigationState} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, Card, Image, ActionBar} from 'react-native-ui-lib';
import {Ionicons,Entypo,AntDesign,Fontisto,MaterialCommunityIcons,FontAwesome} from '@expo/vector-icons';
import { MenuProvider as PopupMenuProvider } from 'react-native-popup-menu';
import {
  Menu as PopupMenu,
  MenuOptions as PopupMenuOptions,
  MenuOption as PopupMenuOption,
  MenuTrigger as PopupMenuTrigger,
} from 'react-native-popup-menu';
import QRCode from 'react-native-qrcode-svg';

const Stack = createNativeStackNavigator();

const EVENT_DATA = [
  {image: require('./assets/moon.jpg'),       name: "Moon Landing Skeptics",      date: "11/17/2021", nPeople: 420,  location: "Atlanta, GA"},
  {image: require('./assets/ussr.png'),       name: "Our Communist Party",        date: "11/23/2021", nPeople: 627,  location: "Atlanta, GA"},
  {image: require('./assets/illuminati.jpg'), name: "New World Order Resistance", date: "11/23/2021", nPeople: 1298, location: "Atlanta, GA"},
];

const PageOuterPaddingView = ({children, style}) => <View style={Object.assign({}, style, {marginHorizontal: 12})}>{children}</View>;

function Dashboard_StatusCard({event, navigation, style}) {
  return (
    <TouchableOpacity onPressOut={() => {navigation.navigate("Event");}} style={style}>
      <Card borderRadius={10} enableShadow={true}>
        <View style={{display: "flex", alignItems: "center", flexDirection: "row", height: 100 }}>
          <Image style={{height: 100, width: 100}} borderTopLeftRadius={10} source={event.image} resizeMode="cover" />
          <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <Text style={{paddingVertical: 5}} text60BL center={true}>{event.name}</Text>
            <Text style={{paddingVertical: 5}} text70 center={true}>{event.date}</Text>              
          </View>
        </View>
        <View flex paddingVertical={10} style={{paddingHorizontal: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <View flex style={{flex:1, flexDirection: "row", justifyContent: "space-around"}}>
            <View flex style={{flex:0, flexDirection: "row", alignItems: "center"}}>
              <Ionicons name="people" size={24} color="black" />
              <Text text70> {event.nPeople}</Text>
            </View>
            <View flex style={{flex:0, flexDirection: "row", alignItems: "center"}}>
              <Ionicons name="location" size={24} color="black" />
              <Text text70> {event.location}</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward-sharp" size={30} color="black" />
        </View>
      </Card>
    </TouchableOpacity>
  );
}

function App_Event({ navigation }) {
  const event = EVENT_DATA[0];

  return (
    <View flex>
      <Text style={{paddingVertical: 5}} center text50>{event.name}</Text>
      <Image style={{height: 150, width: "100%"}} source={event.image} resizeMode="cover" />
      <PageOuterPaddingView flex style={{justifyContent: "center", alignItems: "center"}}>
        <View flex style={{width: "100%", flexDirection: "row", justifyContent: "space-around", marginVertical: 20}}>
          <View flex style={{flex:0, flexDirection: "row", alignItems: "center"}}>
            <Ionicons name="people" size={24} color="black" />
            <Text text70> {event.nPeople}</Text>
          </View>
          <View flex style={{flex:0, flexDirection: "row", alignItems: "center"}}>
            <Ionicons name="location" size={24} color="black" />
            <Text text70> {event.location}</Text>
          </View>
          <View flex style={{flex:0, flexDirection: "row", alignItems: "center"}}>
            <Ionicons name="calendar" size={24} color="black" />
            <Text text70> {event.date}</Text>
          </View>
        </View>
        <View flex backgroundColor="#000000" style={{justifyContent: "center", alignItems: "center", borderRadius: 20, padding: 20, marginVertical: 20}}>
          <QRCode
            enableLinearGradient
            backgroundColor="#000000"
            size={200}
            linearGradient={['rgb(255,255,255)','rgb(255,0,255)']	}
            value="https://youtu.be/dQw4w9WgXcQ"
          />
        </View>
        <Text center style={{marginVertical: 20}}>
          QR-Codes regenerate every 10s and disappear once used
        </Text>
      </PageOuterPaddingView>
    </View>
  );
}

function Dashboard_StatusList(navigation) {
  return (
    <ScrollView>
    {
      EVENT_DATA.map((e, i) => <Dashboard_StatusCard key={i} navigation={navigation} event={e} style={{ paddingTop: i != 0 ? 20 : 0 }} />)
    }
    </ScrollView>
  );
}

function Dashboard_Status() {
  return (
    <Card borderRadius={10} style={{display: "flex", flexDirection: "row", paddingHorizontal: 12, padding: 15}}>
      <View flex style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <Text center text60>Vaccine(s)</Text>
        <FontAwesome style={{marginVertical: 10}} name="check-circle" size={40} color="green" />
        <Text text70>2/2 & 2 weeks</Text>
      </View>
      <View flex style={{flex:1, justifyContent: "center", alignItems: "center"}}>
        <Text center text60>Test(s)</Text>
        <FontAwesome style={{marginVertical: 10}} name="warning" size={40} color="orange" />
        <Text text70>Expired</Text>
      </View>
    </Card>
  );
}

function Dashboard_Privacy() {
  return (
    <Text>
      We could perhaps place a copy of our Privacy Policy right here.
    </Text>
  );
}

function Dashboard_OpenSource() {
  const items = [
    {
      "name": "React Native",
      "description": "React Native combines the best parts of native development with React, a best-in-class JavaScript library for building user interfaces.",
      "link": "https://github.com/facebook/react-native",
      "license_link": "https://github.com/facebook/react-native/blob/main/LICENSE"
    },
    {
      "name": "Expo",
      "description": "Expo is an open-source platform for making universal native apps that run on Android, iOS, and the web. It includes a universal runtime and libraries that let you build native apps by writing React and JavaScript.",
      "link": "https://github.com/expo/expo",
      "license_link": "https://github.com/expo/expo/blob/master/LICENSE"
    },
    {
      "name": "React Navigation -> Stack",
      "description": "Stack navigator for React Navigation.",
      "link": "https://github.com/react-navigation/react-navigation/tree/main/packages/stack",
      "license_link": "https://github.com/react-navigation/react-navigation/blob/main/packages/stack/LICENSE"
    },
    {
      "name": "React Navigation -> Native",
      "description": "React Native integration for React Navigation.",
      "link": "https://github.com/react-navigation/react-navigation/tree/main/packages/native",
      "license_link": "https://github.com/react-navigation/react-navigation/blob/main/packages/native/LICENSE"
    },
    {
      "name": "RNUI",
      "description": "UI Components Library for React Native",
      "link": "https://github.com/wix/react-native-ui-lib",
      "license_link": "https://github.com/wix/react-native-ui-lib/blob/master/LICENSE",
    }
  ];

  return (
    <View flex>
      <Text text70>Open Source Dependencies & Licenses:</Text>
      {
        items.map((e, i) => {
          return (
            <View key={i} flex style={{flexDirection: "row"}}>
              <Text>- </Text>
              <View flex style={{flex:1}}>
                <Text style={{color: "#0000FF", fontWeight: "800"}} onPress={() => Linking.openURL(e.link)}>{e.name}: </Text>
                <Text style={{textAlign: "justify"}}>{e.description}</Text>
                <Text center style={{color: "#0000FF"}} onPress={() => Linking.openURL(e.license_link)}>View License</Text>
              </View>
            </View>
          );
        })
      }
    </View>
  );
}

// sections = { name, obj_right, func }
function GenerateSections(sections, navigation) {
  return (
    <>
      {
        sections.map((e, i) => {
          return (
            <View key={i}>
              <View flex style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 10}}>
                <Text text50 heading>{e.name}</Text>
                {e.obj_right}
              </View>
              {e.func(navigation)}
            </View>
          );
        })
      }
    </>
  );
}

function IconPopupMenu({ touchable, items }) {
  return (
    <PopupMenu>
      <PopupMenuTrigger>
        {touchable}
      </PopupMenuTrigger>
      <PopupMenuOptions customStyles={{optionsContainer: {borderRadius: 15}}}>
        {
          items.map((e, i) => {
            return (
              <PopupMenuOption onSelect={e.func} key={i} style={{display: "flex", flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                {e.icon}
                <Text text70 style={{flex:1, textAlign: "center"}}>{e.text}</Text>
              </PopupMenuOption>
            );
          })
        }
      </PopupMenuOptions>
    </PopupMenu>
  );
}

function App_Dashboard(navigation) {
  const statusPopupItems = [
    {
      text: "Add Vaccine",
      icon: <Fontisto name="injection-syringe" size={24} color="black" />,
      func: () => {}
    },
    {
      text: "Add Test",
      icon: <MaterialCommunityIcons name="test-tube" size={24} color="black" />,
      func: () => {}
    }
  ];

  const eventsPopupItems = [
    {
      text: "From Code",
      icon: <MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />,
      func: () => {}
    },
    {
      text: "From QR Code",
      icon: <AntDesign name="qrcode" size={24} color="black" />,
      func: () => {}
    }
  ];

  return (
    <PageOuterPaddingView>
      {GenerateSections([
        { 
          name: "Your Status",
          obj_right: (<IconPopupMenu items={statusPopupItems} touchable={<Ionicons name="add-circle-outline" size={40} color="black" />}></IconPopupMenu>), 
          func: Dashboard_Status
        },
        { name: "Your Upcoming Events",
          obj_right: (<IconPopupMenu items={eventsPopupItems} touchable={<Ionicons name="add-circle-outline" size={40} color="black" />}></IconPopupMenu>),
          func: Dashboard_StatusList
        }
      ], navigation)}
    </PageOuterPaddingView>
  );
}

function App_Privacy(navigation) {
  return (
    <PageOuterPaddingView>
      {GenerateSections([{
        name: "Your Privacy",
        obj_right: <></>,
        func: Dashboard_Privacy
      }], navigation)}
    </PageOuterPaddingView>
  );
}

function App_OpenSource(navigation) {
  return (
    <PageOuterPaddingView>
    {GenerateSections([{
      name: "Open Source",
      obj_right: <></>,
      func: Dashboard_OpenSource
    }], navigation)}
    </PageOuterPaddingView>
  );
}

function ScreenHolder({navigation, func}) {
  return (
    <SafeAreaView style={{ flex:1, backgroundColor: "#FFFFFF" }}>
      <View flex padding-page style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
        <ScrollView style={{backgroundColor: "white"}}>
          {func(navigation)}
          <Text>{"\n"}{"\n"}</Text>
        </ScrollView>
        <App_Navbar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const APP_SCREENS = [
  { bNavbarShow: true,  name: "Privacy",    icon_func: (color) => <Entypo    name="lock"   size={20} color={color} />, func: App_Privacy    },
  { bNavbarShow: true,  name: "Dashboard",  icon_func: (color) => <Entypo    name="home"   size={20} color={color} />, func: App_Dashboard  },
  { bNavbarShow: true,  name: "OpenSource", icon_func: (color) => <AntDesign name="github" size={20} color={color} />, func: App_OpenSource },
  { bNavbarShow: false, name: "Event",      icon_func: () => {},                                                       func: App_Event      }
];

function App_Navbar({ navigation, activeItemKey }) {
  const routes       = useNavigationState(state => state.routes);
  const currentRoute = routes[routes.length - 1].name;

  const actions = Array.prototype.concat(
    [{
      label: <Ionicons name="ios-chevron-back-circle-sharp" size={20} color="white" />,
      onPressOut: () => {navigation.goBack()}
    }],
    APP_SCREENS.filter((e) => e.bNavbarShow).map((e, i) => {
      return {
        label: e.icon_func(currentRoute == e.name ? "#FF0000" : "#FFFFFF" ),
        onPressOut: () => {navigation.navigate(e.name)}
      };
    })
  );

  return (
    <ActionBar centered backgroundColor="#000000" actions={actions} useSafeArea={true}></ActionBar>
  );
}

export default function App() {
  return (
    <PopupMenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={APP_SCREENS[1].name}>
          {
            APP_SCREENS.map((e, i) => {
              return (
                <Stack.Screen key={{i}} name={e.name}>
                  {props => <ScreenHolder {...props} func={e.func} />}
                </Stack.Screen>
              );
            })
          }
        </Stack.Navigator>
      </NavigationContainer>
    </PopupMenuProvider>
  );
}