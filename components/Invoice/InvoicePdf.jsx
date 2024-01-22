'use client'
import React from 'react'
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
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'gray',
      margin: '15 6.70033pt',
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
});

const InvoicePdf = ({ tableDetails, buyerDetails }) => {
   
  let total = 0
  if(Array.isArray(tableDetails)){
      total = tableDetails.reduce((acc, row) => acc + (row.quantity * row.price),0);
  }else{
      console.log("Given data is not an array")
  } 

  return (
    <Document>
    {console.log(buyerDetails)}
<Page size="A4" style={styles.page}>
<View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: "row", gap: "30", backgroundColor:'#39A7FF','color':'#000', 'borderRadius':'10','padding':'10 10' }}>
        <Image style={{ width: 100, borderRadius: '10' }} src={"/AHGFLogo.jpg"}/>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...styles.content_2, fontSize: '28', fontWeight: '900', textAlign: 'center' }}>Al-Hadi Goat Farm</Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '600', textAlign: 'center', textTransform: 'uppercase' }}>Premium Quality, Guaranteed.</Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '600', textAlign: 'center' }}>Sajid Mulla : 88502 84856</Text>
        </View>
    </View>
   
   

    <View style={{ margin: '10 0' }}>
        <Text style={{ ...styles.content_2, fontSize: '24', fontWeight: '900', textAlign: 'center' }}>Invoice</Text>
        <Text style={{ ...styles.content_2, fontSize: '18', fontWeight: '600', textAlign: 'left' , marginTop: '10', marginLeft: '10' }}>Billing Details</Text>
    </View>

    <View style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: "row", marginTop: '10', gap: '40', marginRight: '20' }}>
        <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'center' }}>Shipping Date: {buyerDetails?.shippingDate.toString().split("-").reverse().join("/")}</Text>
    </View>

    <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", marginTop: '10', gap: '40', marginLeft: '10' }}>
        <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'center' }}>Bill To: {buyerDetails?.billTo}</Text>
        <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'center' }}>Phone: {buyerDetails?.phone}</Text>
    </View>  

    <View style={styles.table}>

        <View style={{ height: 30, flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'center' }}>Deliverables</Text>
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
            <View style={{ ...styles.cell }}>
                <Text style={{  ...styles.headerText }}>Total</Text>
            </View>
        </View>

        {Array.isArray(tableDetails) && tableDetails.map((data,key) => (
            <View style={styles.row}>

                <View style={{ ...styles.cell, width: '60%' }}>

                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.desc}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.quantity}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.price}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.quantity * data.price}</Text>
                </View>
            </View>

        ))}

        <View style={{ padding : '0 30'}}>
            <View style={{ height: 30, flexDirection: 'row', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'left' }}>Total Amount</Text>
                <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'right' }}>{total}</Text>
            </View>
        </View>

    </View>

    <View style={{ backgroundColor: '#39A7FF', color: '#000', width: '100%', marginTop: '15','color':'#000', 'borderRadius':'10','padding':'10 0' }}>
        <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'center' }}>Thank you for doing business with us</Text>
    </View>
  
</Page>
</Document>
  )
}

export default InvoicePdf