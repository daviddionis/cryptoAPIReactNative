import React from 'react';
import {StyleSheet, Platform, Text} from 'react-native';

const Header = () =>(
    <>
        <Text style={styles.encabezado}>Criptomonedas</Text>
    </>
)

const styles=StyleSheet.create({
    encabezado:{
        paddingTop: Platform.OS === 'ios' ? 50 : 15,
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        paddingBottom: 10, 
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20,
        color: 'white'
    }
});

export default Header;