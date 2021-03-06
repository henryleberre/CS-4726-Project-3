import React,{useState,useEffect} from 'react';
import {Dimensions,StatusBar,SafeAreaView,Platform,TouchableOpacity,ScrollView,TextInput,Linking} from 'react-native';
import {NavigationContainer,useNavigationState} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View,Text,Card,Image,Button,ActionSheet,Dialog as RNUIDialog,Switch} from 'react-native-ui-lib';
import {Ionicons,Entypo,AntDesign,Fontisto,MaterialCommunityIcons,FontAwesome} from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import {Camera} from 'expo-camera';
import {FlatGrid} from 'react-native-super-grid';
import Dialog from "react-native-dialog";
import {
  Menu         as PopupMenu,
  MenuOptions  as PopupMenuOptions,
  MenuOption   as PopupMenuOption,
  MenuTrigger  as PopupMenuTrigger,
  MenuProvider as PopupMenuProvider,
} from 'react-native-popup-menu';

const Stack = createNativeStackNavigator();

let PEOPLE_DATA = [
  {name: "Karl Marx",            bUnderAge: false, bVaccinated: true,  bTested: false},
  {name: "Jenny von Westphalen", bUnderAge: false, bVaccinated: false, bTested: true },
  {name: "Jenny Caroline Marx",  bUnderAge: true,  bVaccinated: false, bTested: false}
];

const EVENT_DATA = [
  {image: require('./assets/moon.jpg'),       name: "Moon Landing Skeptics",      date: "11/17/2021", nPeople: 420,  location: "Atlanta, GA", nReservedSpots: 3, family: ["Karl Marx"]},
  {image: require('./assets/ussr.png'),       name: "Our Communist Party",        date: "11/23/2021", nPeople: 627,  location: "Atlanta, GA", nReservedSpots: 3, family: ["Karl Marx"]},
  {image: require('./assets/illuminati.jpg'), name: "New World Order Resistance", date: "11/23/2021", nPeople: 1298, location: "Atlanta, GA", nReservedSpots: 3, family: ["Karl Marx"]},
];

const PageOuterPaddingView = ({children, style}) => <View style={Object.assign({}, style, {paddingHorizontal: 12})}>{children}</View>;

function Dashboard_StatusCard({eventID, navigation, style}) {
  let event = EVENT_DATA[eventID];

  return (
    <TouchableOpacity onPress={() => {navigation.navigate("Event", eventID);}} style={style}>
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

function App_Event({ navigation, route }) {
  const eventID = route.params;
  let event     = EVENT_DATA[eventID];

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  let QRCodeLinks = ["https://youtu.be/dQw4w9WgXcQ", // rick roll
                     "https://youtu.be/udBPW2rMQnc", // macron "C'est notre projet"
                     "https://youtu.be/KWjNoYQ-92A", // macron "Penser printemps"
                     "https://youtu.be/B-SBJjIjqYY"  // macron "Ceux qui sont et ceux qui ne sont rien"
                    ];

  let grid_data = [];
  for (let i = 0; i < event.nReservedSpots; ++i) {
    grid_data.push([i < event.family.length, i]);
  }

  let [action_sheet_show, set_action_sheet_show] = useState(false);

  return (
    <ScrollView style={{display: "flex"}}>
      <Text style={{paddingVertical: 20}} center text50>{event.name}</Text>
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
        <Text text60 style={{paddingVertical: 20}}>Participants</Text>
        <FlatGrid
          itemDimension={130}
          data={grid_data}
          renderItem={({item}) => (
            <TouchableOpacity>
              <Card flex style={{flexDirection: "column", padding: 20, justifyContent: "center", alignContent: "center", alignItems: "center"}}>
                <Text text60 center>{item[0] ? event.family[item[1]] : "Add"} {'\n'}</Text>
                {item[0] && <QRCode size={100} value={QRCodeLinks[(time + item[1]) % QRCodeLinks.length]} />}
                {item[0] && <TouchableOpacity>
                  <Button onPress={() => { event.family.splice(event.family.indexOf(event.family[item[1]]), 1); }} style={{marginTop: 20, borderColor: "red", borderWidth: 2, backgroundColor: "white"}}>
                    <Text text70>Remove</Text>
                  </Button>
                </TouchableOpacity>}
                {!item[0] && <AntDesign onPress={() => {set_action_sheet_show(true)}} name="adduser" size={100} color="black" />}
              </Card>
            </TouchableOpacity>
          )}
        />
        <ActionSheet
          options={
            PEOPLE_DATA.filter(x => !event.family.includes(x.name)).map((e) => {
              return {
                label: e.name,
                onPress: () => { event.family.push(e.name) }
              }
            })
          }
          visible={action_sheet_show} onDismiss={() => {set_action_sheet_show(false)}} title="Add A Member" message="msg" useNativeIOS={false}
        />
      </PageOuterPaddingView>
    </ScrollView>
  );
}

function Dashboard_StatusList({navigation}) {
  return (
    <ScrollView>
    {
      EVENT_DATA.map((e, i) => <Dashboard_StatusCard key={i} navigation={navigation} eventID={i} style={{ paddingTop: i != 0 ? 20 : 0 }} />)
    }
    </ScrollView>
  );
}

function Dashboard_Status({ bUnderAge, bVaccinated, bTested }) {
  return (
    <Card borderRadius={10} style={{paddingHorizontal: 12, padding: 15}}>
      <View style={{display: "flex", flexDirection: "column"}}>
        <View style={{opacity: bUnderAge ? 0.1 : 1, display: "flex", flexDirection: "row"}}>
          <View flex style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text center text60>Vaccine(s)</Text>
            <FontAwesome style={{marginVertical: 10}} name={bVaccinated ? "check-circle" : "close"} size={40} color={bVaccinated ? "green" : "red"} />
            <Text text70>2/2 & 2 weeks</Text>
          </View>
          <View flex style={{flex:1, justifyContent: "center", alignItems: "center"}}>
            <Text center text60>Test(s)</Text>
            <FontAwesome style={{marginVertical: 10}} name={bTested ? "check-circle" : "close"} size={40} color={bTested ? "green" : "red"} />
            <Text text70>{bTested ? "Valid 2 days" : "Invalid"}</Text>
          </View>
        </View>
        {bUnderAge ? <Text center style={{paddingTop: 20}}>This person is underage, no information is required.</Text> : <></>}
      </View>
    </Card>
  );
}

function App_PrivacyBody() {
  return (
    <Text>
      We could perhaps place a copy of our Privacy Policy right here.
    </Text>
  );
}

function App_OpenSourceBody() {
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
      <Text text70 style={{textAlign: "justify"}} justify>
        This service relies on the incredible work of the open-source community, leveraging the unique skills and abilities of creators around the world.
        {'\n'} {'\n'}
        Open Source Dependencies & Licenses:
      </Text>
      {
        items.map((e, i) => {
          return (
            <TouchableOpacity key={i}>
              <View flex style={{flexDirection: "column", justifyContent: "center", alignItems: "center", marginVertical: 10}}>
                <View flex style={{flex: 1, flexDirection: "row", alignItems: "center", paddingVertical: 10}}>
                  <AntDesign size={1/3*77.5} name="github" color="black" style={{marginHorizontal: 10}} />
                  <Text style={{flex: 1, fontWeight: "bold"}} center grey10 text70>
                    {e.name}
                  </Text>
                </View>
                <Text grey30 text70 style={{textAlign: "justify"}}>
                  {e.description}
                </Text>
              </View>
            </TouchableOpacity>
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
              {e.func({navigation})}
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

function App_Dashboard({navigation}) {
  let [code_prompt_show, set_code_prompt_show] = useState(false);

  const eventsPopupItems = [
    {
      text: "From Code",
      icon: <MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />,
      func: () => { set_code_prompt_show(true); }
    },
    {
      text: "From QR Code",
      icon: <AntDesign name="qrcode" size={24} color="black" />,
      func: () => { navigation.navigate("AddEventQR"); }
    }
  ];

  return (
    <>
      <Dialog.Container visible={code_prompt_show}>
        <Dialog.Title>Please enter the code</Dialog.Title>
        <Dialog.Description>
          Do you want to delete this account? You cannot undo this action.
        </Dialog.Description>
        <Dialog.Input placeholder="right here" />
        <Dialog.Button onPress={() => {set_code_prompt_show(false);}} label="Cancel" />
        <Dialog.Button onPress={() => {set_code_prompt_show(false);}} label="Submit" />
      </Dialog.Container>
      <PageOuterPaddingView>
        {GenerateSections([
          { name: "Your Upcoming Events",
            obj_right: (<IconPopupMenu items={eventsPopupItems} touchable={<Ionicons name="add-circle-outline" size={40} color="black" />}></IconPopupMenu>),
            func: Dashboard_StatusList
          }
        ], navigation)}
      </PageOuterPaddingView>
    </>
  );
}

function App_Privacy({navigation}) {
  return (
    <PageOuterPaddingView>
      {GenerateSections([{
        name: "Your Privacy",
        obj_right: <></>,
        func: App_PrivacyBody
      }], navigation)}
    </PageOuterPaddingView>
  );
}

function App_OpenSource({navigation}) {
  return (
    <PageOuterPaddingView>
    {GenerateSections([{
      name: "Open Source",
      obj_right: <></>,
      func: App_OpenSourceBody
    }], navigation)}
    </PageOuterPaddingView>
  );
}

// This solution is really hacky, especially manipulating that route object
function Page_CameraSteps({navigation, route}) {
  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
    })();
  }, []);

  const {params} = route;
  const {step}   = params;

  // This is why C++ is better than RUST
  // Don't @me, I'm right.
  const nextParams = (() => {let r = Object.assign({}, params); r.step++; return r;})();

  return (
    <View style={{display: "flex", flexDirection: "column"}}>
      <View flex style={{width: "100%", backgroundColor: "#000000", paddingVertical: 10, flexDirection: "row", justifyContent: "space-around"}}>
        <Text text50 center white>{params.page_title}</Text>
        <Text text50 center white>Step {step+1}/{params.steps.length}</Text>
      </View>
      <PageOuterPaddingView style={{width: "100%", height: "100%", paddingVertical: 10}}>
        <Text text50 center style={{paddingTop: params.steps[step].show_camera ? 30 : 0, paddingBottom: 10}}>{params.steps[step].instructions}</Text>
        
        {params.steps[step].show_camera &&
        <View style={{width: "100%", height: Dimensions.get('window').width}}>
          <Camera style={{flex:1}} type={Camera.Constants.Type.back} />
        </View>
        }
        <Button style={{marginVertical: 20}} onPress={()=>{step != params.steps.length-1 ? navigation.navigate("CameraSteps", nextParams) : navigation.navigate("Dashboard")}} color="white" label={step != params.steps.length-1 ? params.steps[step].button_title : "Return to Dashboard"} backgroundColor="green"></Button>
      </PageOuterPaddingView>
    </View>
  );
}

function App_AddTest({navigation}) {
  return <Page_CameraSteps navigation={navigation} route={{
    params: {
      step: 0,
      page_title: "Add a test",
      steps: [
        {
          instructions: "Take a picture of your ID",
          button_title: "Capture",
          show_camera: true,
        },
        {
          instructions: "Scan your test's QR Code",
          button_title: "Capture",
          show_camera: true,
        },
        {
          instructions: "All done! \n\n We're processing your request",
          button_title: "",
          show_camera: false,
        }
      ]
    }
  }} />;
}

function App_AddEventQR({navigation, route}) {
  return <Page_CameraSteps navigation={navigation} route={{
    params: {
      step: 0,
      page_title: "Add an Event",
      steps: [
        {
          instructions: "Take a picture of your ID",
          button_title: "Capture",
          show_camera: true,
        },
        {
          instructions: "Give us some details about your vaccination",
          button_title: "Capture",
          show_camera: true,
        },
        {
          instructions: "All done! \n\n We're processing your request",
          button_title: "",
          show_camera: false,
        }
      ]
    }
  }} />;
}

function App_AddVacine({navigation, route}) {
  return <Page_CameraSteps navigation={navigation} route={{
    params: {
      step: 0,
      page_title: "Add a Vaccination",
      steps: [
        {
          instructions: "Take a picture of your ID",
          button_title: "Capture",
          show_camera: true,
        },
        {
          instructions: "Scan your QR Code for the Event",
          button_title: "Capture",
          show_camera: true,
        },
        {
          instructions: "All done! \n\n We're processing your request",
          button_title: "",
          show_camera: false,
        }
      ]
    }
  }} />;
}

function App_People({navigation, route}) {
  const statusPopupItems = [
    {
      text: "Add Vaccine",
      icon: <Fontisto name="injection-syringe" size={24} color="black" />,
      func: () => { navigation.navigate("AddVaccine"); }
    },
    {
      text: "Add Test",
      icon: <MaterialCommunityIcons name="test-tube" size={24} color="black" />,
      func: () => { navigation.navigate("AddTest"); }
    }
  ];

  const sections = PEOPLE_DATA.map((e, i) => {
    return { name: e.name,
             obj_right: (<IconPopupMenu items={statusPopupItems} touchable={<Ionicons name="add-circle-outline" size={40} color="black" />}></IconPopupMenu>), 
             func: () => {return Dashboard_Status(e)} }
  });

  let [dialog_visible,  set_dialog_visible]  = useState(false);
  let [name_text,       set_name_text]       = useState("");
  let [underage_switch, set_underage_switch] = useState(false);

  return (
    <PageOuterPaddingView>
      <RNUIDialog centerH centerV useSafeArea containerStyle={{backgroundColor: "white", padding: 30, borderRadius: 15}} onDismiss={() => {set_dialog_visible(false);}} center visible={dialog_visible}>
        <Text center text60 style={{paddingBottom: 20}}>Add A Member</Text>
        <Text text70 style={{paddingBottom: 10}}>Name:</Text>
        <TextInput value={name_text} onChangeText={set_name_text} style={{borderWidth: 1, padding: 5, borderRadius: 10}} />
        <Text text70 style={{paddingVertical: 10}}>Under Age:</Text>
        <Switch offColor="black" onColor="green" value={underage_switch} onValueChange={set_underage_switch} />
        <Button onPress={() => { set_dialog_visible(false); PEOPLE_DATA.push({name: name_text, bUnderAge: underage_switch, bVaccinated: false, bTested: false}) }}
                backgroundColor="green" style={{marginTop: 20}}>
          <Text color="white" text70>Add</Text>
        </Button>
      </RNUIDialog>
      <Text text50 center>Health & Profiles{'\n'}</Text>
      <View style={{display: "flex", flexDirection: "column"}}>
        {GenerateSections(sections, navigation)}
      </View>
      <Text text50>{'\n'}</Text>
      <TouchableOpacity>
        <Button onPress={() => {set_dialog_visible(true);}} backgroundColor="white" style={{borderColor: "black", borderWidth: 2, borderRadius: 20}}>
          <Text>Add A Member</Text>
        </Button>
      </TouchableOpacity>
    </PageOuterPaddingView>
  );
}

function ScreenHolder({navigation, route, func}) {
  return (
    <SafeAreaView style={{ flex:1, backgroundColor: "#FFFFFF" }}>
      <View flex padding-page style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}>
        <ScrollView>
          {func({navigation, route})}
          <Text>{"\n"}{"\n"}</Text>
          <Text center>Contact us:{"\n"}</Text>
          <View flex style={{flexDirection: "row"}}>
            <View flex style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <Entypo name="phone" size={24} color="black" />
              <Text style={{paddingHorizontal: 10, textDecorationLine: "underline"}} onPress={() => {Linking.openURL("tel:1 (800) 672-3888")}}>1 (800) 672-3888</Text>
            </View>
            <View flex style={{flex: 1, flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
              <Entypo name="mail" size={24} color="black" />
              <Text style={{paddingHorizontal: 10, textDecorationLine: "underline"}} onPress={() => {Linking.openURL("mailto:kef@star-co.net.kp")}}>kef@star-co.net.kp</Text>
            </View>
          </View>
          <Text>{"\n"}{"\n"}</Text>
        </ScrollView>
        <App_Navbar navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const APP_SCREENS = [
  { bNavbarShow: true,  name: "People",      icon_func: (color) => <Ionicons  name="person-circle-sharp" size={30} color={color} />, func: App_People },
  { bNavbarShow: true,  name: "Dashboard",   icon_func: (color) => <Entypo    name="home"                size={30} color={color} />, func: App_Dashboard    },
  { bNavbarShow: true,  name: "Privacy",     icon_func: (color) => <Entypo    name="lock"                size={30} color={color} />, func: App_Privacy      },
  { bNavbarShow: true,  name: "OpenSource",  icon_func: (color) => <AntDesign name="github"              size={30} color={color} />, func: App_OpenSource   },
  { bNavbarShow: false, name: "Event",       icon_func: () => {},                                                                    func: App_Event        },
  { bNavbarShow: false, name: "AddTest",     icon_func: () => {},                                                                    func: App_AddTest      },
  { bNavbarShow: false, name: "AddEventQR",  icon_func: () => {},                                                                    func: App_AddEventQR   },
  { bNavbarShow: false, name: "CameraSteps", icon_func: () => {},                                                                    func: Page_CameraSteps },
  { bNavbarShow: false, name: "AddVaccine",  icon_func: () => {},                                                                    func: App_AddVacine    }
];

function App_Navbar({ navigation, activeItemKey }) {
  const routes       = useNavigationState(state => state.routes);
  const currentRoute = routes[routes.length - 1].name;

  const actions = Array.prototype.concat(
    [{
      label: <Ionicons name="ios-chevron-back-circle-sharp" size={30} color="#000000" />,
      func: () => {navigation.goBack()}
    }],
    APP_SCREENS.filter((e) => e.bNavbarShow).map((e, i) => {
      return {
        label: e.icon_func(currentRoute == e.name ? "#FF0000" : "#000000" ),
        func: () => {navigation.navigate(e.name)}
      };
    })
  );

  return (
    <View height={60} style={{borderTopColor: "black", borderTopWidth: "2", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row"}}>
      {actions.map((e, i) => {
        return (
          <TouchableOpacity key={i} onPress={e.func}>
            {e.label}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function App() {
  return (
    <PopupMenuProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Dashboard">
          {
            APP_SCREENS.map((e, i) => {
              return (
                <Stack.Screen key={i} name={e.name}>
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