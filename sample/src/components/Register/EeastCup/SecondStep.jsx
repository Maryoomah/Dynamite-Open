import { useContext} from "react";
import { RegisterContext } from "../contexts/RegisterContext.jsx";
import InputBox from "../Auth/InputBox.jsx";
import { useState } from "react";


const SecondStep = () => {

   const { formData, setFormData, errors } = useContext(RegisterContext);
   const [ratingLink, setRatingLink] = useState('');

   const amountLookup = {
        "Masters (N20,000)": 20000,
        "Intermediate (N15,000)": 15000,
        "Opens (N10,000)": 10000
    };


    const getAmount = (band) => {
        const baseAmount = amountLookup[band];
        formData.amount_payed = baseAmount ? String(baseAmount) : "";
        return baseAmount ? `N${baseAmount.toLocaleString()}` : "";
    };


    const ratingsLookup = {
        "Masters (N20,000)": {
            link: "/docs/masters_list.pdf",
            title: "Masters",
        },

         "Intermediate (N15,000)": {
            link: "/docs/intermediate_list.pdf",
            title: "Intermediate",
        },

        "Opens (N10,000)": {
            link: "/docs/opens_list.pdf",
            title: "Opens",
        },
    }

    const getRatingLink = (category) => {
        const ratingSelected = ratingsLookup[category];
        formData.registration_band = ratingSelected ? String(ratingSelected) : "";

        const handleClick = (e) => {
            e.preventDefault();
            window.open(ratingSelected.link, '_blank');
        };

        return ratingSelected ? (
            <a href={ratingSelected.link} onClick={handleClick} target="_blank" rel="noopener noreferrer">
            <span className="text-gold text-xs underline cursor-pointer">Click to check for your {ratingSelected.title} rating</span>
            </a>
        ) : "";
        };


    


   const selectData = [
    {
        name: "registration_band",
        value: "Masters (N20,000)"
    },

    {
        name: "registration_band",
        value: "Intermediate (N15,000)"
    },

    {
        name: "registration_band",
        value: "Opens (N10,000)"
    }
   ]


   const selectMealOne = [
    {
        name: "meal_one",
        value: "Rice"
    },

    {
        name: "meal_one",
        value: "Swallow"
    },

   ]

   const selectMealTwo = [
    {
        name: "meal_two",
        value: "Rice"
    },

    {
        name: "meal_two",
        value: "Swallow"
    },

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
          handleChange: (e) => {
                const value = e.target.value;
                const ratingLink = getRatingLink(value);
                setFormData({ ...formData, registration_band: value });
                setRatingLink(ratingLink);
            },

        },


        {   
            element: "select",
            name: "meal_one",
            label: "Select a Meal For Day 1",
            data: selectMealOne,
            defaultValue: "Choose a Meal",
            error: errors.meal_one,
            value: formData.meal_one,
            handleChange: (e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, meal_one: value });
              },
  
        },


        {   
            element: "select",
            name: "meal_two",
            label: "Select a Meal For Day 2",
            data: selectMealTwo,
            defaultValue: "Choose a Meal",
            error: errors.meal_two,
            value: formData.meal_two,
            handleChange: (e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, meal_two: value });
              },
  
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


       
    ];

    const inputAmount = [
         {   
            element: "input",
            show: true,   
            type: "text",
            name: "amount_payed",
            label: "Amount Payable",
            placeholder: "E.g. N0000",
            error: errors.amount_payed,
            value: getAmount(formData.registration_band),
            handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
        },
    ]


 


  return (
        <form  className="w-full py-6 lg:py-8">
            <h3 className="mb-4 text-xl font-bold leading-none text-white">Step 2</h3>
                <div className="w-full grid gap-6 mb-4 sm:grid-cols-2">
  
                   {
                        inputs.map((input, i) => (
                            <InputBox key={i} {...input}/>
                        ))
                   }    
                    {ratingLink && <div>{ratingLink}</div>}

                   {
                        inputAmount.map((input, i) => (
                            <InputBox key={i} {...input}/>
                        ))
                   }    
        
                </div>
        </form>
  );
};

export default SecondStep;