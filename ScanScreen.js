import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import io from 'socket.io-client';

export default function ScanScreen({ route, navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [barcodeData, setBarcodeData] = useState(null);
  const [socket, setSocket] = useState(null);

  const { serverIP, serverPort } = route.params; // Lấy serverIP và serverPort từ tham số route

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');

      if (socket === null) {
        const newSocket = io(`http://${serverIP}:${serverPort}`);
        setSocket(newSocket);

        return () => {
          newSocket.disconnect();
        };
      }
    })();
  }, [serverIP, serverPort]);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    const fields = data.split('|');
    const newBarcodeData = {
      CCCD: fields[0] || '',
      CMT: fields[1] || '',
      HOTEN: fields[2] || '',
      NGAYSINH: fields[3] || '',
      DIACHI: fields[5] || '',
      NGAYCAP: fields[6] || '',
    };
    setBarcodeData(newBarcodeData);

    if (socket) {
      socket.emit('qrcode', newBarcodeData);
      console.log('Sent QR code data to server:', newBarcodeData);
    } else {
      console.log('Socket connection not available.');
    }

    navigation.navigate('ViewScan', { barcodeData: newBarcodeData });
  };

  const resetScan = () => {
    setScanned(false);
    setBarcodeData(null);
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  if (hasPermission === false) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.dataContainer}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoImg} source={require('./images/logo.png')} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Tiếp tục quét"
              onPress={resetScan}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
  logoImg: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    marginBottom: 50,
  },
});