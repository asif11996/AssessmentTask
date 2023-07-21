import React, {useState} from 'react';
import {View, Text, SafeAreaView, SafeAreaProvider} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {hp, wp} from '../../constants/Dimentions';
import {Formstyles} from '../../constants/Formstyles';
// import {hp, wp} from '../../styles/Dimensions';

function CheckBox({texts, onPresses, value, disableBuiltInState, formView}) {
  return (
    <SafeAreaProvider style={{flex: 1}}>
      <SafeAreaView
        style={{
          flex: 1,
          marginTop: hp(1),
          backgroundColor: '#fff',
          paddingVertical: hp(2),
          width: '100%',
          paddingHorizontal: wp(2),
          shadowColor: '#000',
          borderRadius: wp(1.5),
          shadowOpacity: 0.15,
          shadowRadius: 3,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          elevation: 2,
        }}>
        <BouncyCheckbox
          size={hp(3)}
          fillColor="#3155a5"
          isChecked={value}
          unfillColor="#FFFFFF"
          text={texts}
          iconStyle={Formstyles.iconStyle}
          textStyle={Formstyles.textStyle}
          style={Formstyles.checkboxStyles}
          // textStyle={{ fontFamily: "JosefinSans-Regular" }}
          textContainerStyle={{flex: 1}}
          onPress={onPresses}
          disableBuiltInState={disableBuiltInState}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
export default React.memo(CheckBox);
