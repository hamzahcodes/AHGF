import React from 'react'
import Image from 'next/image';
const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
const ViewImageDialog = ({activeImage}) => {
   return (
     <dialog id="imageModal" className="modal modal-bottom sm:modal-middle">
     <div className='m-auto min-w-[80%] bg-[#fefefe] shadow-xl rounded-xl flex justify-center items-center p-8'>
       <Image
         placeholder={`data:image/svg+xml;base64,${toBase64(
           shimmer(700, 475)
         )}`}
         src={activeImage}
         width={500}
         height={500}
         alt='Image not found'
        
       />

     </div>
     </dialog>
   );
}

export default ViewImageDialog