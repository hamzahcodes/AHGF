'use client'

import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

Font.register({
    family: 'Ubuntu',
    fonts: [
      {
        src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
      },
      {
        src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        fontWeight: 'bold',
      },
      {
        src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
        fontWeight: 'normal',
        fontStyle: 'italic',
      },
    ],
  });

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontFamily: 'Ubuntu',
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
        // borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'gray',
        margin: '15 6.70033pt',
        borderRadius: '10'
    },
    row: {
        height: 30,
        flexDirection: 'row',
    },
    cell: {
        width: '25%',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'gray',
        borderCollapse: 'collapse',
        padding: 1,
    },
    text: {
        fontSize: 12,
        pading: '4 0',
        color: '#000'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
        alignItems: 'center',
        color: '#000'
    },    
    tableStyle: {
        width: "100%",
        borderCollapse: "collapse",
        // boxShadow: "0 4 8 rgba(0, 0, 0, 0.1)",
        marginBottom: 20,
    },
    tableHeaderStyle: {
        color: "white",
        padding: 12,
        textAlign: "left",
    },
    tableCellStyle: {
        borderBottom: "1 solid #ddd",
        padding: 12,
    }
});

const StockPdf = ({ stockData }) => {
  return (
    <Document>
<Page size="A4" style={styles.page}>
<View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: "row", gap: "30", backgroundColor:'#39A7FF','color':'#000', 'borderRadius':'10','padding':'10 10' }}>
        <Image style={{ width: 100, borderRadius: '10' }} src={window.location.origin + "/AHGFLogo.jpg"}/>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...styles.content_2, fontSize: '28', fontWeight: '900', textAlign: 'center' }}>Al-Hadi Goat Farm</Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '600', textAlign: 'center', textTransform: 'uppercase' }}>Premium Quality, Guaranteed.</Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '600', textAlign: 'center' }}>Sajid Mulla : 88502 84856</Text>
        </View>
</View>
    <View style={{ paddingRight: '13'}}>
  {Array.isArray(stockData) && stockData.map((data) => (
  <View style={styles.table}>

  <View style={{ height: 30, flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "#39A7FF" }}>
      <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'center' }}>SupplierName: {data.supplierName}</Text>
  </View>

  <View style={{ height: 30, flexDirection: 'row' }}>

      <View style={{ ...styles.cell, width: '60%' }}>
          <Text style={{  ...styles.headerText }}>Item</Text>
      </View>
      <View style={{ ...styles.cell }}>
          <Text style={{  ...styles.headerText }}>Quantity</Text>
      </View>
      <View style={{ ...styles.cell }}>
          <Text style={{  ...styles.headerText }}>Price</Text>
      </View>
  </View>

  {data.stockDetails.length > 0 && data.stockDetails.map((data1, key) => (
      <View style={styles.row}>

          <View style={{ ...styles.cell, width: '60%' }}>

              <Text style={{ ...styles.text, textAlign: 'center' }}>{data1?.name}</Text>
          </View>
          <View style={{ ...styles.cell }}>
              <Text style={{ ...styles.text, textAlign: 'center' }}>{data1?.quantity}</Text>
          </View>
          <View style={{ ...styles.cell }}>
              <Text style={{ ...styles.text, textAlign: 'center' }}>{data1?.price}</Text>
          </View>
      </View>

  ))} 


</View> 
    ))   
    }
     </View>

  
</Page>
</Document>
  )
}

export default StockPdf