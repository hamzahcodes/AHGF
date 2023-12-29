'use client'

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 20,
    },
    title: {
        fontSize: 18,
      
        fontWeight: 'bold',
        textAlign:'center',
        margin: '4 0',
        padding: '3 1'

    },
    content: {
        fontSize: 8,
        color: "#044c9c",
        fontWeight: 'bold',
        margin: '20 0'

    },
    content_2: {
        fontSize: 10,
        textAlign:'center',
        fontWeight: 'bold',
        margin: '1 0 4'


    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
       
        marginLeft: '6.70033pt',
        // borderTop: '2 solid gray',
        // borderBottom: '2 solid gray'
    },
    row: {
        height: 30,
        flexDirection: 'row',
    },
    cell: {
        width: '25%',
       
        // borderStyle: 'solid',
        borderWidth: '1',
        borderCollapse: 'collapse',


        padding: 1,
    },
    text: {
        fontSize: 12,
        pading: '4 0',
        // textAlign: 'left',
        // paddingLeft: 2,
        color: '#000'
       


    },
    headerCell: {
        // backgroundColor: '#DCDCDC',
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 15,
        pading: '4 0',
        // textAlign: 'left',
        // paddingLeft: 2,
        color: '#000'

    },
    addressContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


        width: '100%',
        marginBottom: 5,


    },
    address_div: {


        width: '40%',

    }
});

const DeliveryNotes = () => {
    return (
<Document>
<Page size="A4" style={styles.page}>
    <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor:'#39A7FF','color':'#fff','borderRadius':'10','padding':'10 0' }}>

        {/* <Image style={{ width: 20, textAlign: 'center' }} src={logo} /> */}
        <Text style={{ ...styles.content_2, fontSize: '24', fontWeight: '900', textAlign: 'center' }}>Al-Hadi Goat Farm</Text>
        <Text style={{ ...styles.content_2, fontSize: '18', fontWeight: '600', textAlign: 'center' }}>Ghodbunder Rd, near Golden Valley Resort, काजुपाडा</Text>
        <Text style={{ ...styles.content_2, fontSize: '18', fontWeight: '600', textAlign: 'center' }}>Versova, Mira Bhayandar, Maharashtra 401107</Text>
    </View>
   
   

   

    <Text style={styles.title}>Delivery Note</Text>
    <Text style={{ ...styles.content_2 }}>Shipping Details</Text>

    <View style={styles.table}>

        <View style={styles.row}>

            <View style={{ ...styles.cell, ...styles.headerCell }}>

                <Text style={{  ...styles.headerText }}>Date</Text>
            </View>
            <View style={{ ...styles.cell, ...styles.headerCell }}>
                <Text style={{  ...styles.headerText }}>Payout</Text>
            </View>
            <View style={{ ...styles.cell, ...styles.headerCell }}>
                <Text style={{  ...styles.headerText }}>Balance</Text>
            </View>
            <View style={{ ...styles.cell, ...styles.headerCell }}>
                <Text style={{  ...styles.headerText }}>Total</Text>
            </View>
        </View>

        {/* {customerData.financial_details.map((data,key) => (
            <View style={styles.row}>

                <View style={{ ...styles.cell, ...styles.headerCell }}>

                    <Text style={{ ...styles.text }}>{new Date(data.pay_date).toLocaleDateString().toString() }</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.headerCell, 'backgroundColor':'rgba(144, 238, 144, 0.2)' }}>
                    <Text style={{ ...styles.text }}>+ {data.amount}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.headerCell, 'backgroundColor': 'rgba(255, 102, 102, 0.1)' }}>
                    <Text style={{ ...styles.text, }}>{total - Number(data.amount)}</Text>
                </View>
                <View style={{ ...styles.cell, ...styles.headerCell }}>
                    <Text style={{ ...styles.text }}>{total}</Text>
                </View>
            </View>

        ))} */}

    </View>
  
</Page>
</Document>
    )
}

export default DeliveryNotes