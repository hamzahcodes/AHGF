import React from 'react'
import Image from 'next/image';


const ViewImageDialog = ({activeImage}) => {
   return (
     <dialog id="imageModal" className="modal modal-bottom sm:modal-middle">
     <div className='m-auto min-w-[80%] bg-[#fefefe] shadow-xl rounded-xl flex justify-center items-center p-8'>
       <Image
       
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