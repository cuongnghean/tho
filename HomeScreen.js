import React, { useState } from 'react';
import { View, StyleSheet, Button, Image, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [serverIP, setServerIP] = useState('');
  const [serverPort, setServerPort] = useState('');

  const handleStartScan = () => {
    navigation.navigate('Scan', { serverIP, serverPort });
  };

  return (
    <KeyboardAvoidingView // Sử dụng KeyboardAvoidingView để tránh bàn phím che mất input
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Ứng dụng quét CCCD của NNT</Text>
      </View>
      <View style={styles.logoContainer}>
        <Image style={styles.logoImg} source={require('./images/logo.png')} />
      </View>
      <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Nhập địa chỉ IP máy chủ"
          onChangeText={text => setServerIP(text)}
          value={serverIP}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Nhập cổng máy chủ"
          onChangeText={text => setServerPort(text)}
          value={serverPort}
      />
      </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Bắt đầu quét"
          onPress={handleStartScan}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10, // Khoảng cách giữa logo và nút
  },
  logoImg: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    marginBottom: 50, // Khoảng cách giữa nút và phần còn lại của màn hình
  },
   titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  inputContainer: {
    marginBottom: 20, // Khoảng cách giữa input và nút
  },
  inputWrapper: {
    flexDirection: 'row', // Hiển thị ô nhập liệu theo chiều ngang
    alignItems: 'center', // Căn chỉnh ô nhập liệu theo trục dọc
    marginBottom: 10, // Khoảng cách giữa hai ô nhập liệu
    borderWidth: 1, // Độ dày viền
    borderColor: '#ccc', // Màu viền
    borderRadius: 5, // Bo góc
    height: 50,
    width: 350, // Chiều cao cố định
  },
  input: {
    flex: 1,
    padding: 15, // Khoảng cách giữa nội dung và viền
    fontSize: 16, // Kích thước phông chữ
  },
});
