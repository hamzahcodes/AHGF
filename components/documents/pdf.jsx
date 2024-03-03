import React from 'react'
import { Page,PDFDownloadLink,  Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

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

const Pdf = ({ customerData, total }) => {
  if (customerData === null) {
    return (
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Certificate Details</Text>
        </View>
      </Page>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            gap: "30",
            backgroundColor: "#39A7FF",
            color: "#000",
            borderRadius: "10",
            padding: "10 10",
          }}
        >
          <Image
            style={{ width: 100, borderRadius: "10" }}
            src={"/AHGFLogo.jpg"}
          />
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...styles.content_2,
                fontSize: "28",
                fontWeight: "900",
                textAlign: "center",
              }}
            >
              Al-Hadi Goat Farm
            </Text>
            <Text
              style={{
                ...styles.content_2,
                fontSize: "12",
                fontWeight: "600",
                textAlign: "center",
                textTransform: "uppercase",
              }}
            >
              Premium Quality, Guaranteed.
            </Text>
            <Text
              style={{
                ...styles.content_2,
                fontSize: "12",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Sajid Mulla : 88502 84856
            </Text>
          </View>
        </View>

        <Text style={styles.title}>
          {customerData.basic_details.username} Statement
        </Text>
        <Text style={{ ...styles.content_2 }}>
          Phone Number: {customerData.basic_details.phone_no}
        </Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <View style={{ ...styles.cell, ...styles.headerCell }}>
              <Text style={{ ...styles.headerText }}>Date</Text>
            </View>
            <View style={{ ...styles.cell, ...styles.headerCell }}>
              <Text style={{ ...styles.headerText }}>Payout</Text>
            </View>
            <View style={{ ...styles.cell, ...styles.headerCell }}>
              <Text style={{ ...styles.headerText }}>Balance</Text>
            </View>
            <View style={{ ...styles.cell, ...styles.headerCell }}>
              <Text style={{ ...styles.headerText }}>Total</Text>
            </View>
          </View>

          {customerData.financial_details.map((data, key) => (
            <View style={styles.row}>
              <View style={{ ...styles.cell, ...styles.headerCell }}>
                <Text style={{ ...styles.text }}>
                  {new Date(data.pay_date).toLocaleDateString().toString()}
                </Text>
              </View>
              <View
                style={{
                  ...styles.cell,
                  ...styles.headerCell,
                  backgroundColor: "rgba(144, 238, 144, 0.2)",
                }}
              >
                <Text style={{ ...styles.text }}>+ {data.amount}</Text>
              </View>
              <View
                style={{
                  ...styles.cell,
                  ...styles.headerCell,
                  backgroundColor: "rgba(255, 102, 102, 0.1)",
                }}
              >
                <Text style={{ ...styles.text }}>
                  {total - Number(data.amount)}
                </Text>
              </View>
              <View style={{ ...styles.cell, ...styles.headerCell }}>
                <Text style={{ ...styles.text }}>{total}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};



const CustomerReport = ({ customerData,total }) => {
  






    if (customerData === null) {
        return (
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Certificate Details</Text>
                </View>
            </Page>
        )
    }


    return (
      <PDFDownloadLink
        className="bg-[seagreen] text-[#fff] rounded-xl py-2 px-2 text-sm 2xl:text-[0.5vw] inline-block w-full h-full"
        document={<Pdf customerData={customerData} total={total} />}
        fileName={`${customerData.basic_details.username}.pdf`}
      >
        {({ blob, url, loading, error }) =>
          loading ? "Loading..." : "Customer Report"
        }
      </PDFDownloadLink>
    );
}


export default CustomerReport
