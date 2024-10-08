import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { Readable } from "node:stream";
import { google } from "googleapis";

const CLIENT_ID =
  process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN =
  process.env.REFRESH_TOKEN;
  const REDIRECT_URI = process.env.REDIRECT_URI;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);



// oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })
oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});





let drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});


export async function GET(request) {
  
console.log("====================================");
console.log(REFRESH_TOKEN);
console.log("====================================");
    try {
      const response = await drive.files.list({
        q: `'1N8tIICcVLTJY1NMCL1of72nCxfTMDFZ0' in parents and trashed = false`,
      });

      console.log("====================================");
      console.log(response.data.files, "Available files");
      console.log("====================================");
     
    } catch (error) {
      console.log("BROKEN", error);
     
    }

}



async function uploadFile(fileName,buffer) {
 

  try {
    const response = await drive.files.list({
      q: ` name contains 'aarib_m' and  mimeType = 'application/vnd.google-apps.folder' `,
    });

    console.log("====================================");
    console.log(response.data.files), "VVVVV";
    console.log("====================================");
    let folderId, folderName;
  
      folderId = [response.data.files[0].id];
      folderName = response.data.files[0].name;
    
    console.log("====================================");
    console.log(folderId, "FOLDER",  response.data.files);
    console.log("====================================");

    const fileMetadata = {
      name: fileName,
      parents: folderId,
    };

    const response2 = await drive.files.create({
      resource: fileMetadata,
      media: {
        mimeType: "image/jpg",
        body: Readable.from(buffer),
      },
    });

    console.log("====================================");
    console.log(response2, fileName, folderName, "RS");
    console.log("====================================");
    if (response2.status == 200) {
      console.log('====================================');
      console.log(response2);
      console.log('====================================');
   
    }
    return response2.status;
  } catch (error) {
    
    console.log("====================================");
    console.log(error, "ERROr");
    console.log("====================================");
  }
}

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }

 
  const buffer = await file.stream();

  const uploadResp = await uploadFile(file.name,buffer)

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  
  return NextResponse.json({ success: true });
}
