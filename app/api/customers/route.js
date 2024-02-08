import Customer from "@/models/Customer";
import { connectToDB } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Readable } from "node:stream";
import { google } from "googleapis";
import Request from "@models/Request";
import { uploadImageToCloudinary } from "@utils/cloudinary";


// async function uploadFile(fileName, buffer) {
//   const CLIENT_ID =
//     "844988512004-9kb817k70e8otj240ugvlds4ondfclb5.apps.googleusercontent.com";
//   const CLIENT_SECRET = "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";
//   const REFRESH_TOKEN =
//     "1//04Ejv7qSbQggVCgYIARAAGAQSNwF-L9IrOoKKnGHNKZc59WZhQsLwlO6TKq2LjGKu-6ubB8g0kJVLcGkW3Wqy1qzRP7OsfXBuGEc";
//   const REDIRECT_URI = "https://developers.google.com/oauthplayground";

//   const oauth2Client = new google.auth.OAuth2(
//     CLIENT_ID,
//     CLIENT_SECRET,
//     REDIRECT_URI
//   );

//   // oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
//   oauth2Client.setCredentials({
//     refresh_token: REFRESH_TOKEN,
//   });

//   let drive = google.drive({
//     version: "v3",
//     auth: oauth2Client,
//   });

//   try {
//     const response = await drive.files.list({
//       q: ` name contains 'payslipAttachments' and  mimeType = 'application/vnd.google-apps.folder' `,
//     });

//     console.log("====================================");
//     console.log(response.data.files,"UIUI")
//     console.log("====================================");
//     let folderId, folderName;

//     folderId = [response.data.files[0].id];
//     folderName = response.data.files[0].name;

//     console.log("====================================");
//     console.log(folderId, "FOLDER", response.data.files);
//     console.log("====================================");

//     const fileMetadata = {
//       name: fileName,
//       parents: folderId,
//     };

//     const response2 = await drive.files.create({
//       resource: fileMetadata,
//       media: {
//         mimeType: "image/jpg",
//         body: Readable.from(buffer),
//       },
//     });

//     console.log("====================================");
//     console.log(response2.data.id, "65");
//     console.log("====================================");
//     if (response2.status == 200) {
//       console.log("====================================");
//       console.log(response2);
//       console.log("====================================");
//     }
//     return response2.data.id;
//   } catch (error) {
//     console.log("====================================");
//     console.log(error, "ERROr");
//     console.log("====================================");
//   }
// }

// to get all customers meant for customers page
// also when particular customer is clicked then its details api is added


export const GET = async (req, res) => {
  try {
    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    console.log(session);
    const userID = session.user.id;
    if(!userID) return NextResponse.json({ 'error': "unauthorized"}, { status: 401 })

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("custID");

    await connectToDB();

    let counter = await Request.findOne();
    if(!counter) counter = await Request.create({})
    counter.getRequestCalls++;
    await counter.save()
    if (!id) {
      const customers = await Customer.find({ user_id: userID });
      return NextResponse.json({ message: customers }, { status: 200 });
    } else {
      console.log(id);
      const customer = await Customer.find({ _id: id, user_id: userID });
      return NextResponse.json({ message: customer }, { status: 200 });
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

// create customer
export const POST = async (req, res) => {
  // accepting request in the form of JSON only
  // console.log(req);
  const { basic_details, financial_details, goat_details } = await req.json();
  const { searchParams } = new URL(req.url);
  try {
    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    
    const userID = session.user.id;
    if(!userID) return NextResponse.json({ 'error': "unauthorized"}, { status: 401 })


    await connectToDB();

    let counter = await Request.findOne();
    if(!counter) counter = await Request.create({})
    counter.postRequestCalls++;
    await counter.save()

    const newCustomer =
      financial_details === undefined && goat_details === undefined
        ? new Customer({
            basic_details: {
              username: basic_details.username,
              phone_no: basic_details.phone_no,
            },
            user_id: userID,
          })
        : new Customer({
            basic_details: {
              username: basic_details.username,
              phone_no: basic_details.phone_no,
            },
            financial_details: [
              {
                amount: financial_details.amount,
                pay_date: financial_details.pay_date,
              },
            ],
            goat_details: [
              {
                goat_type: goat_details.goat_type,
                palaai_type: goat_details.palaai_type,
                total_amount: goat_details.total_amount,
                off_boarding: goat_details.off_boarding,
              },
            ],
            user_id: userID,
          });

    console.log(newCustomer);
    const createdCustomer = await Customer.create(newCustomer);

    return NextResponse.json({ message: createdCustomer }, { status: 201 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};



// append another goat_detail OR financial details
export const PUT = async (req, res) => {
  
  // accepting request in the form of JSON only
  const { basic_details, financial_details, goat_details } = await req.json()
  console.log(financial_details);
  try {
    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const userID = session.user.id;

    // to fetch unique ID of customers and update them
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("custID");

    // check before DB gets involved
    if (!id)
      return NextResponse.json(
        { message: "ID required to delete!!" },
        { status: 404 }
      );

    await connectToDB();

    let counter = await Request.findOne();
    if(!counter) counter = await Request.create({})
    counter.putRequestCalls++;
    await counter.save()

    // appending only financial details array to existing customer
    if (financial_details && !basic_details && !goat_details) {
      
      const imageUrl = await uploadImageToCloudinary(financial_details.imageFile);
      financial_details.imageFile = imageUrl


      const filter = { _id: id, user_id: userID };
      const update = { $push: { financial_details: financial_details } };
      const updatedFinance = await Customer.findOneAndUpdate(filter, update, {
        new: true,
      });

      if (updatedFinance)
        return NextResponse.json({ message: updatedFinance }, { status: 200 });
      return NextResponse.json(
        { message: "Finance details not updated" },
        { status: 404 }
      );
    }

    // appending only goat details array to existing customer
    if (goat_details && !basic_details && !financial_details) {
      const filter = { _id: id, user_id: userID };
      const update = { $push: { goat_details: goat_details } };
      const updatedGoatDetail = await Customer.findOneAndUpdate(
        filter,
        update,
        { new: true }
      );

      if (updatedGoatDetail)
        return NextResponse.json(
          { message: updatedGoatDetail },
          { status: 200 }
        );
      return NextResponse.json(
        { message: "Finance details not updated" },
        { status: 404 }
      );
    }

    // in doubt whether we even require this API as we will deal with addition of goat or financial details only
    // const updateCustomer = {
    //   basic_details: {
    //     username: basic_details.username,
    //     phone_no: basic_details.phone_no,
    //   },
    //   financial_details: [
    //     {
    //       amount: financial_details.amount,
    //       pay_date: financial_details.pay_date,
    //       balance: financial_details.balance,
    //     },
    //   ],
    //   goat_details: [
    //     {
    //       goat_type: goat_details.goat_type,
    //       palaai_type: goat_details.palaai_type,
    //       on_boarding: goat_details.on_boarding,
    //       off_boarding: goat_details.off_boarding,
    //     },
    //   ],
    // };

    // const updated = await Customer.findByIdAndUpdate(id, updateCustomer);

    // if (updated)
    //   return NextResponse.json({ message: updateCustomer }, { status: 200 });
    // return NextResponse.json({ message: "Failed to update" }, { status: 404 });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

// delete particular financial_details or goat_detail
export const DELETE = async (req, res) => {
  try {
    const { financial_details, goat_details } = await req.json()

    const session = await getServerSession(options);

    if (!session) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const userID = session.user.id;
    // to fetch unique ID of customers and delete them
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("custID");

    // check before DB gets involved
    if (!id)
      return NextResponse.json(
        { message: "ID required to delete!!" },
        { status: 404 }
      );

    if (financial_details && !goat_details) {
        const filter = { _id: id, user_id: userID };
        const update = { $pull: { financial_details: financial_details._id.toString() } };
        const updatedFinance = await Customer.findOneAndUpdate(filter, update, {
          new: true,
        });
  
        if (updatedFinance) return NextResponse.json({ message: updatedFinance }, { status: 200 });
        return NextResponse.json(
          { message: "Finance details not deleted" },
          { status: 404 }
        );
    } else {
        const filter = { _id: id, user_id: userID };
        const update = { $pull: { goat_details: goat_details._id.toString() } };
        const updatedGoatDetail = await Customer.findOneAndUpdate(filter, update, {
          new: true,
        });
  
        if (updatedGoatDetail) return NextResponse.json({ message: updatedGoatDetail }, { status: 200 });
        return NextResponse.json(
          { message: "Goat details not deleted" },
          { status: 404 }
        );
    }

    
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 505 });
  }
};
