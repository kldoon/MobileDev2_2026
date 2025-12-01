import { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { Button } from '@rneui/themed';
import MapView from 'react-native-maps';

const MyLocation = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [weather, setWeather] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: 10 });
    setLocation(location);
    console.log(location);

    if (location?.coords) {
      const addressRes = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=AIzaSyBrD9qK8hpZAbS83FBDJ68NuDdFjzdolXA`);
      const addressJSON = await addressRes.json();
      setAddress(addressJSON.results?.[0]?.formatted_address);
      console.log(JSON.stringify(addressJSON, null, 2));

      const weatherRes = await fetch(`https://weather.googleapis.com/v1/currentConditions:lookup?location.latitude=${location.coords.latitude}&location.longitude=${location.coords.longitude}&key=AIzaSyBrD9qK8hpZAbS83FBDJ68NuDdFjzdolXA`);
      const weatherJSON = await weatherRes.json();
      console.log(JSON.stringify(weatherJSON, null, 2));

      setWeather(weatherJSON.temperature.degrees + '°  _ ' + weatherJSON.wind.speed.value + ' kmH   _ ' + weatherJSON.weatherCondition.description.text);
      setWeatherIcon(weatherJSON.weatherCondition.iconBaseUri + '_dark.png');
    }

  }

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <Text style={styles.paragraph}>{text}</Text>
        <Text style={styles.paragraph}>{address}</Text>
        <Text style={styles.paragraph}>{weather}</Text>
        {weatherIcon && <Image style={{ width: 70, height: 70 }} source={{ uri: weatherIcon }} />}
        <Button onPress={getCurrentLocation}>Get my location</Button>
      </View>
      {
        <MapView
          style={styles.map}
          region={location ? {
            latitude: location.latitude,
            longitude: location.longitude
          } : undefined
          }
        />
      }
    </View>
  );
}

export default MyLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  location: {
    flexBasis: 1
  },
  map: {
    flexBasis: 1,
    width: '100%',
  }
});
