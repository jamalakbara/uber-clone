import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selecttravelTimeInformation } from '../slices/navSlice'

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "UberXL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "UberLUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
]

const SURGE_CHARGE_RATE = 1.5

const RideOptionsCard = () => {
  const navigation = useNavigation()
  const [selected, setSelected] = useState(null)
  const travelTimeInformation = useSelector(selecttravelTimeInformation)

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity style={tw`absolute top-3 left-5 p-3 rounded-full z-50`} onPress={() => navigation.navigate("NavigateCard")}>
          <Icon 
            name='chevron-left'
            type='font-awesome'
          />
        </TouchableOpacity>
        <Text style={tw`text-center py-6 text-xl`}>Select a Ride - {travelTimeInformation?.distance?.text}</Text>
      </View>

      <FlatList 
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity 
            style={tw`flex-row justify-between items-center px-5 ${item.id === selected?.id && "bg-gray-200"}`}
            onPress={() => setSelected(item)}
          >
            <Image 
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain"
              }}
              source={{uri: item.image}}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'IDR'
              }).format(
                (travelTimeInformation?.duration?.value * SURGE_CHARGE_RATE * item.multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      
      <View style={tw`mt-auto border-t border-red-900`}>
        <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && "bg-gray-300"}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard

const styles = StyleSheet.create({})