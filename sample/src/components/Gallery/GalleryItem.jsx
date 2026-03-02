import Image from 'next/image'

function GalleryItem(props) {
   
   
    return (
        <div className="relative my-6 lg:my-0 w-72 mx-6 group">
            <div className="hover:scale-105 transition duration-300 ease-in-out cursor-pointer my-6 lg:my-0 w-72 mx-5 h-56 object-cover relative border-4 border-solid border-secondary rounded-md overflow-hidden">
                <Image src={props.image} fill style={{ objectFit: "cover" }} alt='Gallery' className="hover:!opacity-4"/>
            </div>
                <div className="absolute cursor-pointer flex justify-center items-center flex-col bottom-0 left-0 right-0 w-full bg-white z-[5] p-1 rounded-md border-b-8 border-solid border-secondary">
                   <div  className="flex justify-center lg:justify-between items-center flex-row">
                     <h5 className="font-bold text-lg my-2 text-primary rounded-md">{props.year}</h5>
                   </div>

                </div>

               {
                    props.handleView && 
                     <div className="hidden group-hover:flex hover:flex absolute cursor-pointer justify-center items-center flex-col top-[100px] left-10 right-0  z-[5] p-1">
                        <button className="bg-[rgba(0,0,0,0.9)] text-white text-center p-2 rounded-full"
                         onClick={props.handleView}>View</button>
                    </div>
               }
            </div>
    )
}

export default GalleryItem