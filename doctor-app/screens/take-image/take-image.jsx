import { useRef, useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Slider } from '@rneui/themed';
import * as MediaLibrary from 'expo-media-library';

const TakeImage = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions({ request: true, writeOnly: true, granularPermissions: ['photo', 'audio'] });

  const cameraRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [zoom, setZoom] = useState(0);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const takeImage = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      setPhotos(prev => [photo, ...prev].slice(0, 3));

      if (mediaPermission?.status !== 'granted') {
        const response = await requestMediaPermission();

        if (!response.granted) {
          Alert.alert('Permission required', 'Cannot save photo without gallery permission');
          return;
        }
      }

      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      const album = await MediaLibrary.getAlbumAsync('DoctorApp');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('DoctorApp', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync(asset, album, false);
      }

      Alert.alert('Saved!', 'Photo saved to your gallery');
    } catch (error) {
      console.error('Error saving photo:', error);
      Alert.alert('Error', 'Failed to save photo');
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} zoom={zoom} facing={facing} ref={cameraRef} />
      <View style={styles.preview}>
        {
          photos.map((photo, index) => (
            <Image
              key={index}
              source={{ uri: photo.uri }}
              style={styles.thumbnail}
            />
          ))
        }
      </View>
      <View>
        <Slider
          maximumValue={1}
          minimumValue={0}
          step={0.1}
          value={zoom}
          onValueChange={z => setZoom(z)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takeImage}>
          <Text style={styles.text}>Take Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TakeImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: 'transparent'
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  preview: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "#ffffff88",
    paddingHorizontal: 10
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginHorizontal: 2
  }
});
