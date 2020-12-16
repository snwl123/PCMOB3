import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BlockRGB from './components/BlockRGB';
import { FlatList } from 'react-native-gesture-handler';


function HomeScreen( {navigation} )
{

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => <Button onPress={addColor} title="Add Color" />,
        headerLeft: () => <Button onPress={resetColor} title="Reset" />,
      });
    });

    const [colorArray, setColorArray]  = useState([]);

    function renderItem ({item})
    {
      return (
      <TouchableOpacity onPress = {() => navigation.navigate("Info", { ...item, } )}>
        <BlockRGB red = {item.red} green = {item.green} blue = {item.blue}/>
      </TouchableOpacity>
      )
    }


    function addColor()
    {
      let newColor =
      {
        red: Math.floor(Math.random()*256),
        green: Math.floor(Math.random()*256),
        blue: Math.floor(Math.random()*256),
        id: `${colorArray.length}`
      }
      setColorArray
      ([
        ...colorArray,newColor
      ]);
    }

    function resetColor() {
      setColorArray([]);
    }

    return (
      <View style={styles.container}>
        <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />
      </View>
    );
  
}

function infoScreen ({route})
{
  const { red, green, blue } = route.params;

  const textRed = red > 125 ? 255 - red - 20 : 255 + red + 20;
  const textGreen = green > 125 ? 255 - green - 20 : 255 + green + 20;
  const textBlue = blue > 125 ? 255 - blue - 20 : 255 + blue + 20;

  return (
    <View style={[
                  styles.colourInfoContainer,
                  {backgroundColor: `rgb(${red}, ${green}, ${blue})`}
                ]}>
     <Text style = {[styles.colourInfoText,{ color: `rgb(${textRed}, ${textGreen}, ${textBlue})`}]}>Red: {red}</Text>
     <Text style = {[styles.colourInfoText,{ color: `rgb(${textRed}, ${textGreen}, ${textBlue})`}]}>Green: {green}</Text>
     <Text style = {[styles.colourInfoText,{ color: `rgb(${textRed}, ${textGreen}, ${textBlue})`}]}>Blue: {blue}</Text>
    </View>
  )
}


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Info" component={infoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },

  list:
  {
    width: "100%"
  },

  colourInfoContainer:
  {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center"
  },

  colourInfoText:
  {
    fontWeight: "600"
  }

});
