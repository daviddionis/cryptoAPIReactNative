import React, { useState, useEffect } from 'react';
import {Text, View, StyleSheet,TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({moneda, cripto, obtenerMoneda, obtenerCripto, setConsultarAPI}) => {

    const [criptomonedas, setCriptomonedas] = useState([]);

    useEffect(() => {
        const consultarAPI=async ()=>{
            const url='https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado=await axios.get(url);
            setCriptomonedas(resultado.data.Data);
            console.log(resultado)
            setConsultarAPI(false);
        }
        consultarAPI();
    }, []);

    const consultarPrecio=()=>{
        if(moneda.trim()==='' || cripto.trim()===''){
            Alert.alert('Error', 'Ambos campos son obligatorios');
            return;
        }else{
            
        }
    }

    return ( 
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
                onValueChange={ value=>obtenerMoneda(value)}
                selectedValue={moneda}
            >
                <Picker.Item label="- Seleccione -" value=""/> 
                <Picker.Item label="Dolar Estadounidense" value="USD"/>
                <Picker.Item label="Peso Mexicano" value="MXN"/>
                <Picker.Item label="Euro" value="EUR"/>
                <Picker.Item label="Libra Esterlina" value="GBP"/>
            </Picker>
            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
                onValueChange={value=>obtenerCripto(value)}
                selectedValue={cripto}
            >
                <Picker.Item label='- Seleccione -' value=''/> 
                {criptomonedas.map(item=>(
                    <Picker.Item key={item.CoinInfo.Id} label={item.CoinInfo.FullName} value={item.CoinInfo.Name}/> 
                ))
                }
            </Picker>
            <TouchableHighlight
                style={styles.btnConsultar}
                onPress={()=>setConsultarAPI(true)}
            >
                <Text style={styles.btnConsultarText}>Consultar</Text>
            </TouchableHighlight>
        </View>
    );
}

const styles=StyleSheet.create({
    label:{
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20
    },
    btnConsultar:{
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20
    },
    btnConsultarText:{
        color: 'white',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});
 
export default Formulario;