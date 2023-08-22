import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';


export default function ViewScan({ route }) {
  const barcodeData = route.params?.barcodeData || {};

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logoImg} source={require('./images/logo.png')} />
      </View>
      <View style={styles.content}>
        <View style={styles.fieldsContainer}>
          {/* Hiển thị dữ liệu tương ứng vào các trường */}
          <Text style={styles.label}>Họ và tên:</Text>
          <Text style={styles.fieldText}>{barcodeData.HOTEN}</Text>
          
          <Text style={styles.label}>Ngày Sinh:</Text>
          <Text style={styles.fieldText}>{barcodeData.NGAYSINH}</Text>
          
          <Text style={styles.label}>Số CCCD:</Text>
          <Text style={styles.fieldText}>{barcodeData.CCCD}</Text>
          
          <Text style={styles.label}>Ngày cấp CCCD:</Text>
          <Text style={styles.fieldText}>{barcodeData.NGAYCAP}</Text>
          
          <Text style={styles.label}>Số CMND:</Text>
          <Text style={styles.fieldText}>{barcodeData.CMT}</Text>
          
          <Text style={styles.label}>Ngày Cấp CMT:</Text>
          <Text style={styles.fieldText}>{barcodeData.NGAYCAP}</Text>
        </View>
        <View style={styles.buttonRow}>
          <Button
            title="Xuất dữ liệu"
            onPress={() => {
              // Add your code here to handle button press
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  logoImg: {
    width: 200,
    height: 200,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldsContainer: {
    marginBottom: 20,
  },
  fieldText: {
    color: '#000000',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    width: '100%',
    paddingHorizontal: 20,
  },
});
