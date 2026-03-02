import { useState, useEffect } from "react";
import Upload from "./Upload";

const SelectParticipant = () => {
    const [role, setRole] = useState("");
    const [loading, setLoading] = useState(true);
    const active = "!bg-primary !text-black";

    useEffect(() => {
        if (role.length > 0) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 5000);
        } else {
            setLoading(false); // Reset loading state when role is unselected
        }
    }, [role]);



    return (
        <>
            {
                role.length == 0 &&
                <section className={`relative lg:p-0 p-5 my-6 lg:my-20`}>
                    <div className="flex justify-center items-center gap-4">
                        <h3 className="text-white font-bold text-2xl lg:text-4xl">Select Participant</h3>
                    </div>
            
                    <div className="lg:max-w-[40%] lg:mx-auto grid grid-cols-1 gap-6 lg:gap-x-6 my-6">
                        <div className={`${role == "winner" ? active : " "} flex justify-start items-center gap-4 py-5 px-3 border-[1px] border-solid border-primary hover:border-primary  rounded-md cursor-pointer group hover:bg-primary`} onClick={() => setRole("winner")}>
                            <input type={"radio"} name="role_name" value={"winner"} checked={role == "winner" ? true : false} className="block" onChange={(e)  => setRole(e.target.value)}/>
                            <label className={`${role == "winner" ? "!text-black" : ""} text-primary font-semibold text-lg my-4 group-hover:text-black hover:text-black`}> Upload As A Winner </label>
                        </div>

                        <div className={`${role == "loser" ? active: " "} flex justify-start items-center gap-4 py-5 px-3 border-[1px] border-solid border-primary hover:border-primary  rounded-md cursor-pointer group hover:bg-primary`} onClick={() => setRole("loser")}>
                            <input type={"radio"} name="role_name"  value={"loser"} checked={role == "loser" ? true : false} className={`block`} onChange={(e)  => setRole(e.target.value)}/>
                            <label className={`${role == "loser" ? "!text-black" : ""} text-primary font-semibold text-lg my-4 group-hover:text-black hover:text-black`}> Upload As A Loser </label>
                        </div>
                    </div>

                    
                    
                </section>
            }

            { loading && 
                <div className="flex justify-center items-center h-screen">
                    <div className="border-t-[3px] border-[3px] border-black border-solid border-t-primary animate-spin rounded-full h-12 w-12"></div>
                </div>
              
            }

            {
                role.length > 0 && !loading && 
                <Upload title={role}/> 
            }
    
            
        </>
    )
}

export default SelectParticipant