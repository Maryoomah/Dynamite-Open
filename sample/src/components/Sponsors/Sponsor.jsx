import Image from 'next/image'

const Sponsor = ({ sponsor }) => {
   
    return (
        <div className="flex flex-col justify-center items-center p-5">
            <div className="flex flex-col justify-center items-center relative w-40 h-40 p-6 rounded-full border-4 border-solid border-primary overflow-hidden">
                <Image src={sponsor} alt={"Sponsor"} objectFit="cover"/>
            </div>
        </div>
    )
}

export default Sponsor