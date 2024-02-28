'use client'
import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font , PDFDownloadLink } from '@react-pdf/renderer';

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

// Register Poppins font
Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrLDz8Z1JU.woff2',
      fontWeight: 'normal',
    },
    {
      src: 'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLPTucHtF.woff2',
      fontWeight: 'bold',
    },
    {
      src: 'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1JU.woff2',
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

const OnboardingFormPdfTemp = ({ boardingDetails, goatArray, boardingTypeArray}) => {
  return (
    <Document>
<Page size="A4" style={styles.page}>
    <View style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: "row", gap: "30", backgroundColor:'#39A7FF','color':'#000', 'borderRadius':'10','padding':'10 10' }}>
        <Image style={{ width: 100, borderRadius: '10' }} src={"/AHGFLogo.jpg"}/>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...styles.content_2, fontSize: '28', fontWeight: '900', textAlign: 'center' }}>Al-Hadi Goat Farm</Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '600', textAlign: 'center', textTransform: 'uppercase' }}>Premium Quality, Guaranteed.</Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '600', textAlign: 'center' }}>Sajid Mulla : 88502 84856</Text>
        </View>
    </View>
   
   

    <View style={{ margin: '10 0', borderTop: '1', borderBottom: '1', borderColor: '#39A7FF', borderStyle: 'solid' }}>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Address: Ghodbunder Rd, Kajupada, Near Golden Valley Resort, Mira-Bhayander: 401107</Text>
    </View>

    <View style={{ margin: '15 0' }}>
        <Text style={{ ...styles.content_2, fontSize: '18', fontWeight: '900', textAlign: 'center', textTransform: 'uppercase', textDecoration: 'underline' }}>Boarding Agreement</Text>
    </View>

    <View style={{ margin: '5 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", gap: "30", padding: '0 10' }}>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Boarding Number: {boardingDetails?.boardingNumber}</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Date: {`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</Text>
    </View>

    <View style={{ margin: '15 0' }}>
        <Text style={{ ...styles.content_2, fontSize: '18', fontWeight: '900', textAlign: 'center', textTransform: 'uppercase', textDecoration: 'underline' }}>Goat Owner Details</Text>
    </View>

    <View style={{ margin: '5 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", gap: "30", padding: '0 10' }}>
        <Text style={{  fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Owner Name: {boardingDetails?.username}</Text>
        <Text style={{  fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Phone No.: {boardingDetails?.phone_no}</Text>
    </View>
    <View style={{ margin: '5 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", gap: "30", padding: '0 10' }}>
        <Text style={{ fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Address: {boardingDetails?.ownerAddress}</Text>
    </View>
    <View style={{ margin: '5 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", gap: "30", padding: '0 10' }}>
        <Text style={{  fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Email: {boardingDetails?.ownerEmail}</Text>
    </View>

    {/* <View style={{ margin: '15 0' }}>
        <Text style={{ ...styles.content_2, fontSize: '18', fontWeight: '900', textAlign: 'center', textTransform: 'uppercase', textDecoration: 'underline' }}>In Absence of Owner Details</Text>
    </View>
    <View style={{ margin: '5 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", gap: "30", padding: '0 10' }}>
        <Text style={{  fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Name: {boardingDetails?.absentOwner1Name}</Text>
        <Text style={{  fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Phone No.: {boardingDetails?.absentOwner1Phone}</Text>
    </View>
    <View style={{ margin: '5 0', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", gap: "30", padding: '0 10' }}>
        <Text style={{  fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Name: {boardingDetails?.absentOwner2Name}</Text>
        <Text style={{  fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Phone No.: {boardingDetails?.absentOwner2Phone}</Text>
    </View> */}

    <View style={styles.table}>

        <View style={{ height: 30, flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'center', textTransform: 'uppercase', textDecoration: 'underline' }}>Goat Details</Text>
        </View>

        <View style={{ height: 30, flexDirection: 'row' }}>

            <View style={{ ...styles.cell }}>
                <Text style={{  ...styles.headerText }}>Date</Text>
            </View>
            <View style={{ ...styles.cell }}>
                <Text style={{  ...styles.headerText }}>Quantity</Text>
            </View>
            <View style={{ ...styles.cell }}>
                <Text style={{  ...styles.headerText }}>Breed</Text>
            </View>
            <View style={{ ...styles.cell }}>
                <Text style={{  ...styles.headerText }}>Gender</Text>
            </View>
             <View style={{ ...styles.cell }}>
                <Text style={{  ...styles.headerText }}>Type</Text>
            </View>
             <View style={{ ...styles.cell }}>
                <Text style={{  ...styles.headerText }}>Weight</Text>
            </View>
             <View style={{ ...styles.cell }}>
                <Text style={{  ...styles.headerText }}>Height</Text>
            </View>
        </View>

        {Array.isArray(goatArray) && goatArray.map((data,key) => (
            <View style={styles.row}>

                <View style={{ ...styles.cell }}>

                    <Text style={{ ...styles.text, textAlign: 'center' }}>{`${new Date(data.on_boarding).getDate()}/${new Date(data.on_boarding).getMonth()}/${new Date(data.on_boarding).getFullYear()}`}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.quantity}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.breed}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.gender}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.goat_type}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.weight}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.height}</Text>
                </View>
                <View style={{ ...styles.cell }}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>{data.total_amount}</Text>
                </View>

            </View>

        ))}

        

    </View>

    <View style={styles.table}>

<View style={{ height: 30, flexDirection: 'row', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'center', textTransform: 'uppercase', textDecoration: 'underline' }}>Boarding Details</Text>
</View>

<View style={{ height: 30, flexDirection: 'row' }}>

    <View style={{ ...styles.cell }}>
        <Text style={{  ...styles.headerText }}>Monthly</Text>
    </View>
    <View style={{ ...styles.cell }}>
        <Text style={{  ...styles.headerText }}>Rent/Quarterly</Text>
    </View>
    <View style={{ ...styles.cell }}>
        <Text style={{  ...styles.headerText }}>Rent/Half-yearly</Text>
    </View>
    <View style={{ ...styles.cell }}>
        <Text style={{  ...styles.headerText }}>Rent/Yearly</Text>
    </View>
     <View style={{ ...styles.cell }}>
        <Text style={{  ...styles.headerText }}>Departed On</Text>
    </View>
</View>

{Array.isArray(boardingTypeArray) && boardingTypeArray.map((data,key) => (
    <View style={styles.row}>

        <View style={{ ...styles.cell }}>

            <Text style={{ ...styles.text, textAlign: 'center' }}>{data?.monthly}</Text>
        </View>
        <View style={{ ...styles.cell }}>
            <Text style={{ ...styles.text, textAlign: 'center' }}>{data.quarterly}</Text>
        </View>
        <View style={{ ...styles.cell }}>
            <Text style={{ ...styles.text, textAlign: 'center' }}>{data.halfYearly}</Text>
        </View>
        <View style={{ ...styles.cell }}>
            <Text style={{ ...styles.text, textAlign: 'center' }}>{data.yearly}</Text>
        </View>
        <View style={{ ...styles.cell, width: '60%' }}>
            <Text style={{ ...styles.text, textAlign: 'center' }}>{data.departedOn}</Text>
        </View>
    </View> 
))}



    </View>

    <View style={{ margin: '10 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Remarks:</Text>
    </View>
    <View style={{  display: 'flex', justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row', gap: '5'}}>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>1.</Text> 
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left', borderBottom:'1', borderBottomColor: '#000', width: '100%' }}></Text> 
    </View>
    <View style={{  display: 'flex', justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row', gap: '5'}}>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>2.</Text> 
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left', borderBottom:'1', borderBottomColor: '#000', width: '100%' }}></Text> 
    </View>
    <View style={{  display: 'flex', justifyContent: 'center', alignItems: 'baseline', flexDirection: 'row', gap: '5'}}>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>3.</Text> 
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left', borderBottom:'1', borderBottomColor: '#000', width: '100%' }}></Text> 
    </View>
    {/* <View style={{ backgroundColor: '#39A7FF', color: '#000', width: '100%', marginTop: '15','color':'#000', 'borderRadius':'10','padding':'10 0' }}>
        <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '600', textAlign: 'center' }}>Thank you for doing business with us</Text>
    </View>  */}
  
    <View style={{ margin: '60 0',width: '100%',display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '10', flexDirection: 'row' }}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Goat Owner's Signature</Text> 
        </View>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>Authorised Signatory</Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'center' }}>For: Al Hadi Goat Farm</Text>
        </View>
    </View>

    <View style={{ margin: '15 0' }}>
        <Text style={{ ...styles.content_2, fontSize: '18', fontWeight: '900', textAlign: 'center', textTransform: 'uppercase', textDecoration: 'underline' }}>AL HADI GOAT FARM BOARDING FACILITIES</Text>
    </View>

    <View style={{ margin: '10 0' }}>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>1. During the boarding period all goats are fed with our premium feeds under the strict observation of AHGF management.</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>2. Our pens are spacious with attached feeders and drinkers. Feeders amd drinkers are cleaned & wiped daily to maintain hygiene & avoid spreading diseases.</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>3. Our pens are planned to keep the goats safe & secured in any climatic conditions</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>4. Feeding patterns & substances are changed periodically to secure your goats from seasonal illness.</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>5. Grooming and Trimming done periodically, which helps your goats to keep clean and move freely in their pens.</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>6. In the event of failure to collect and pay all appropriate fees within 30 days of end of the agreed boarding period the goats shall become the property of AHGF, who shall be free to dispose of such goats in whatever manner it shall choose.</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>7. While all reasonable care and attention is given to every Goat at AHGF facility, AHGF and its staff members will not be held responsible for any loss or damage arising through ilness or any other reason. Goats are boarded at the Goat Owner's risk.</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>8. AHGF will not be held responsible for the any sort of loss/mortality of goat. AHGF will not provide any compensation in any case.</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>9. Goats will be handed over OR released to the Owner only upon clearance of all dues, If any.</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>10. Equal treatment for all.</Text>
        <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>11. This Boarding Agreement constitutes the entire contact between the AHGF & Goat Owner and hence may ot be modified or ammended except in writing signed by both parties.</Text>
    </View>

    <View>
        <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '900', textAlign: 'left', margin: '15 0' }}>Owner's Acceptance</Text>
        <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexDirection: 'row', paddingHorizontal: '10', margin: '5 0' }}>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>I/we </Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', borderBottom: '1', borderBottomColor: '#000', borderBottomStyle: 'solid', width: '100' }}></Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>have read, understood and accept all the above terms & conditions.</Text>
        </View>
        <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexDirection: 'row', paddingHorizontal: '10', margin: '5 0' }}>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>Signature: </Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', borderBottom: '1', borderBottomColor: '#000', borderBottomStyle: 'solid', width: '100' }}></Text>
        </View>
        <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexDirection: 'row', paddingHorizontal: '10', margin: '5 0' }}>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>Date: </Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', borderBottom: '1', borderBottomColor: '#000', borderBottomStyle: 'solid', width: '100' }}>{`${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`}</Text>
        </View>
    </View>

    <View>
        <Text style={{ ...styles.content_2, fontSize: '16', fontWeight: '900', textAlign: 'left', margin: '15 0' }}>Owner's Reference</Text>
        <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexDirection: 'row', paddingHorizontal: '10', margin: '5 0' }}>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>Name: </Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', borderBottom: '1', borderBottomColor: '#000', borderBottomStyle: 'solid', width: '20%' }}>{boardingDetails?.username}</Text>
        </View>
        <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexDirection: 'row', paddingHorizontal: '10', margin: '5 0' }}>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>Address: </Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', borderBottom: '1', borderBottomColor: '#000', borderBottomStyle: 'solid', width: '100%' }}>{boardingDetails?.ownerAddress}</Text>
        </View>
        <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexDirection: 'row', paddingHorizontal: '10', margin: '5 0' }}>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>Contact: </Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', borderBottom: '1', borderBottomColor: '#000', borderBottomStyle: 'solid', width: '20%' }}>{boardingDetails?.phone_no}</Text>
        </View>
        <View style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline', flexDirection: 'row', paddingHorizontal: '10', margin: '5 0' }}>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', textAlign: 'left' }}>Signature: </Text>
            <Text style={{ ...styles.content_2, fontSize: '12', fontWeight: '900', borderBottom: '1', borderBottomColor: '#000', borderBottomStyle: 'solid', width: '20%' }}></Text>
        </View>
    </View>
</Page>
</Document>
  )
}


const OnboardingFormPdf = ({
  boardingDetails,
  goatArray,
  boardingTypeArray,
}) => {
  return (
    <PDFDownloadLink
      className="bg-[seagreen] text-[#fff] rounded-xl py-2 px-3 text-sm  2xl:text-[0.5vw] my-10"
      document={
        <OnboardingFormPdfTemp
          boardingDetails={boardingDetails}
          goatArray={goatArray}
          boardingTypeArray={boardingTypeArray}
        />
      }
      fileName={`${boardingDetails?.username}_OnboardingForm.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "OnBoarding Form"
      }
    </PDFDownloadLink>
  );
};

export default OnboardingFormPdf