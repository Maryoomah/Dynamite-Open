import { useContext} from "react";
import { RegisterContext } from "../contexts/RegisterContext.jsx";
import InputBox from "../Auth/InputBox.jsx";


const FirstStep = () => {

   const { formData, setFormData, errors } = useContext(RegisterContext);
   
    
    const inputs = [

        {   
            element: "input",
            show: true,   
            type: "text",
            name: "surname",
            label: "Surname",
            placeholder: "E.g. John",
            error: errors.surname,
            value: formData.surname,
            handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
        },


        {   
            element: "input",
            show: true,   
            type: "text",
            name: "firstname",
            label: "Firstname",
            placeholder: "E.g. Doe",
            error: errors.firstname,
            value: formData.firstname,
            handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
        },


        {   
            element: "input",
            show: true,
            type: "text",
            name: "phone_no",
            label: "Phone Number",
            placeholder: "07000000000",
            error: errors.phone_no,
            value: formData.phone_no,
            handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
        },

    
        
    ];



  return (
        <form className="w-full py-6 lg:py-8">
            <h3 className="mb-4 text-xl font-bold leading-none text-white">Step 1</h3>
                <div className="w-full grid gap-6 mb-4 sm:grid-cols-2">
                   {
                        inputs.map((input, i) => (
                            <InputBox key={i} {...input}/>
                        ))
                   }

                   <div className="w-full my-3 lg:my-2">
                    <label htmlFor={"gender"} className="mb-2 block text-sm font-medium text-white">Gender</label>

                        <div className="flex items-center gap-y-2">

                            <label className="block text-sm font-medium text-[#cdcdcd]">
                                <input type={"radio"} name={"gender"} value={"male"} className={`bg-[#f2f2f2] border-[rgba(238,76,76,0.85)] ${errors.gender ? "!border-[rgba(238,76,76,0.85)]" : "border-[rgba(0,0,0,0.5)]"}  text-[#cdcdcd] text-sm rounded-sm focus-within:ring-blue-600 focus-within:border-blue-600 mx-2`} checked={formData.gender == "male" ?  true : false} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}/>
                                Male
                            </label>

                            <label className="block text-sm font-medium text-[#cdcdcd]">
                                <input type={"radio"} name={"gender"} value={"female"} className={`bg-[#f2f2f2] border-[rgba(238,76,76,0.85)] ${errors.gender ? "!border-[rgba(238,76,76,0.85)]" : "border-[rgba(0,0,0,0.5)]"}  text-[#cdcdcd] text-sm rounded-sm focus-within:ring-blue-600 focus-within:border-blue-600 mx-2`} checked={formData.gender == "female" ?  true : false} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}/>
                                Female
                            </label>
                           

                        </div>
                        {errors.gender && <p className="text-sm text-[rgba(238,76,76,0.85)] my-2">{errors.gender}</p>}
                   </div>        
                </div>
        </form>
  );
};

export default FirstStep;