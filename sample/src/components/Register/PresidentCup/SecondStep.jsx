import { useContext} from "react";
import { RegisterContext } from "../contexts/RegisterContext.jsx";
import InputBox from "../Auth/InputBox.jsx";
import Link from  "next/link";


const SecondStep = () => {

   const { formData, setFormData, errors } = useContext(RegisterContext);

   const amountLookup = {
        "Masters (N15,000)": {
            yes: { no: 18500, yes: 18000 },
            no: { no: 15500, yes: 15000 }
        },
        "Intermediate (N12,000)": {
            yes: { no: 15500, yes: 15000 },
            no: { no: 12500, yes: 12000 }
        },
        "Opens (N10,000)": {
            yes: { no: 13500, yes: 13000 },
            no: { no: 10500, yes: 10000 }
        }
    };


    const getAmount = (band, tgif, board) => {
        const amount = amountLookup[band]?.[tgif]?.[board];
        formData.amount_payed = amount ? String(amount) : "";
        return amount ? `N${amount.toLocaleString()}` : "";
    };





   const selectData = [
    {
        name: "registration_band",
        value: "Masters (N15,000)"
    },

    {
        name: "registration_band",
        value: "Intermediate (N12,000)"
    },

    {
        name: "registration_band",
        value: "Opens (N10,000)"
    }
   ]
   
    
    const inputs = [

        {   
            element: "input",
            show: true,
            type: "email",
            name: "email",
            label: "Email",
            placeholder: "E.g doe@example.com",
            error: errors.email,
            value: formData.email,
            handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
        },

        {   
          element: "select",
          name: "registration_band",
          label: "Select a Category",
          data: selectData,
          defaultValue: "Choose a Category",
          error: errors.registration_band,
          value: formData.registration_band,
          handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
        },

        {   
            element: "input",
            show: true,   
            type: "number",
            name: "nsf_rating",
            label: "NSF Rating",
            placeholder: "E.g. 1234",
            error: errors.nsf_rating,
            value: formData.nsf_rating,
            handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
        },


        {   
            element: "input",
            show: true,   
            type: "text",
            name: "amount_payed",
            label: "Amount Payable",
            placeholder: "E.g. N0000",
            error: errors.amount_payed,
            value: getAmount(formData.registration_band, formData.tgif, formData.board),
            handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
        },
    ];


 


  return (
        <form  className="w-full py-6 lg:py-8">
            <h3 className="mb-4 text-xl font-bold leading-none text-white">Step 2</h3>
                <div className="w-full grid gap-6 mb-4 sm:grid-cols-2">
  
                   {
                        inputs.map((input, i) => (
                            <InputBox key={i} {...input}/>
                        ))
                   }    

                   
                   <div className="w-full my-3 lg:my-2">
                    <label htmlFor={"board"} className="mb-2 block text-sm font-medium text-white">Are You Coming With a Board?</label>

                        <div className="flex items-center gap-y-2">

                            <label className="block text-sm font-medium text-[#cdcdcd]">
                                <input type={"radio"} name={"board"} value={"yes"} className={`bg-[#f2f2f2] border-[rgba(255,0,0,0.85)] ${errors.board ? "!border-[rgba(255,0,0,0.85)]" : "border-[rgba(0,0,0,0.5)]"}  text-[#cdcdcd] text-sm rounded-sm focus-within:ring-blue-600 focus-within:border-blue-600 mx-2`} checked={formData.board == "yes" ?  true : false} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}/>
                                Yes
                            </label>

                            <label className="block text-sm font-medium text-[#cdcdcd]">
                                <input type={"radio"} name={"board"} value={"no"} className={`bg-[#f2f2f2] border-[rgba(255,0,0,0.85)] ${errors.board ? "!border-[rgba(255,0,0,0.85)]" : "border-[rgba(0,0,0,0.5)]"}  text-[#cdcdcd] text-sm rounded-sm focus-within:ring-blue-600 focus-within:border-blue-600 mx-2`} checked={formData.board == "no" ?  true : false} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}/>
                                No
                            </label>

                        

                        </div>
                        {errors.board && <p className="text-sm text-[rgba(255,0,0,0.85)] my-2">{errors.board}</p>}
                            {formData.board === "no"  && <p className="text-gold text-xs italic">You will be paying an extra <b>N500</b> sub charge</p>}
                   </div> 

                   
                   <div className="w-full my-3 lg:my-2">
                    <label htmlFor={"tgif"} className="mb-2 block text-sm font-medium text-white">Are You Interested in TGIF Package?</label>

                        <div className="flex items-center gap-y-2">

                            <label className="block text-sm font-medium text-[#cdcdcd]">
                                <input type={"radio"} name={"tgif"} value={"yes"} className={`bg-[#f2f2f2] border-[rgba(255,0,0,0.85)] ${errors.tgif ? "!border-[rgba(255,0,0,0.85)]" : "border-[rgba(0,0,0,0.5)]"}  text-[#cdcdcd] text-sm rounded-sm focus-within:ring-blue-600 focus-within:border-blue-600 mx-2`} checked={formData.tgif == "yes" ?  true : false} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}/>
                                Yes
                            </label>

                            <label className="block text-sm font-medium text-[#cdcdcd]">
                                <input type={"radio"} name={"tgif"} value={"no"} className={`bg-[#f2f2f2] border-[rgba(255,0,0,0.85)] ${errors.tgif ? "!border-[rgba(255,0,0,0.85)]" : "border-[rgba(0,0,0,0.5)]"}  text-[#cdcdcd] text-sm rounded-sm focus-within:ring-blue-600 focus-within:border-blue-600 mx-2`} checked={formData.tgif == "no" ?  true : false} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}/>
                                No
                            </label>

                        </div>

                        {errors.tgif && <p className="text-sm text-[rgba(255,0,0,0.85)] my-2">{errors.tgif}</p>}
                            {formData.tgif === "yes"  && <p className="text-gold text-xs italic">You will be paying an extra <b>N3000</b> sub charge</p>}
                   </div>          
                </div>
        </form>
  );
};

export default SecondStep;