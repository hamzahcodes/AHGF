import Customer from "@/models/Customer";
import { connectToDB } from "@/utils/database";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { Readable } from "node:stream";
import { google } from "googleapis";
import Request from "@models/Request";
import mongoose from "mongoose";
import { uploadImageToCloudinary } from "@utils/cloudinary";

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
  console.log("Financial Details at PUT #193", financial_details);
  console.log("Goat Details at PUT #194", goat_details);
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
      console.log("Goat Detail with ID: ", goat_details._id);
      const filter =  // (goat_details?._id?.length === 0) 
                      (goat_details["_id"] === undefined)
                      ? 
                      { _id: id, user_id: userID } 
                      : 
                      { _id: id, user_id: userID, 
                        'goat_details._id': new mongoose.Types.ObjectId(goat_details._id) };
      const update = //(goat_details?._id?.length === 0) 
                      goat_details["_id"] === undefined
                      ? 
                      { $push: { goat_details: goat_details } } 
                      : 
                      { $set: { 
                        'goat_details.$.quantity': goat_details.quantity,
                        'goat_details.$.height': goat_details.height,
                        'goat_details.$.weight': goat_details.weight,
                        'goat_details.$.breed': goat_details.breed,
                        'goat_details.$.gender': goat_details.gender,
                        'goat_details.$.goat_type': goat_details.goat_type,
                        'goat_details.$.palaai_type': goat_details.palaai_type,
                        'goat_details.$.total_amount': goat_details.total_amount,
                        'goat_details.$.off_boarding': null,
                      }};
      const updatedGoatDetail = await Customer.findOneAndUpdate(
        filter,
        update,
        { new: true }
      );
        console.log(updatedGoatDetail);
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
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

// delete particular financial_details or goat_detail
export const DELETE = async (req, res) => {
  try {
    const { isPayment, _id } = await req.json()

    const session = await getServerSession(options);

    console.log( isPayment, _id );
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

    if (isPayment) {
        const filter = { _id: id, user_id: userID };
        const update = { $pull: { financial_details: { _id: _id } } };
        const updatedFinance = await Customer.findOneAndUpdate(filter, update, { safe: true, multi:true }, {
          new: true,
        });
  
        if (updatedFinance) return NextResponse.json({ message: updatedFinance }, { status: 200 });
        return NextResponse.json(
          { message: "Finance details not deleted" },
          { status: 404 }
        );
    } else {
        console.log("In goat details");
        const filter = { _id: id, user_id: userID };
        const update = { $pull: { goat_details: { _id: _id } } };
        const updatedGoatDetail = await Customer.findOneAndUpdate(filter, update, { safe: true, multi:true },{
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
