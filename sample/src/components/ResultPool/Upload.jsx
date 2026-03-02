import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { selectRounds } from "../../../pages/api/rounds";
import InputBox from "../Register/Auth/InputBox";
import AuthHeader from "../Register/Auth/AuthHeader";
import { uploadValidate } from "../Register/validation/uploadValidate";
import api from "../../../helper/axiosconfig";
import axios from "axios";
import ResponseData from "../Register/Response/Response";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Upload = () => {

        const router = useRouter();
        const [formData, setFormData] = useState({
            category: "",
            round: "",
            winner:  "",
            loser: "",
            winner_score: 0,
            loser_score: 0,
            agreed: false,
        });

        const [errors, setErrors] = useState({});
        const [loading, setLoading] = useState(false);
        const [isDataCorrect, setIsDataCorrect] = useState(false);
        const [players, setPlayers] = useState([]);
        const [filteredPlayers, setFilteredPlayers] = useState([]);

        // Verify upload 
        const [loser_uid, setLoserUID] = useState(0);
        const [loserError, setLoserError] = useState("");
        const [isVerified, setIsVerified] = useState(false);
        const [showVerify, setShowVerify] = useState(false);
        const [isChecked, setIsChecked] = useState(false);

        //fetch Players
        useEffect(() => {
            const getPlayers = async () => {
                try {
                    const response = await api.get("/player/all");
                    const players = response?.data.map(({ surname, firstname, category }) => (
                        {   
                            category: category,
                            value: `${surname} ${firstname}`
                        }
                    ));

                    setPlayers(players);

                } catch(err) { 
                    setPlayers([]);
                    console.log(err)
                }
            }

            getPlayers();
        }, []);


           const selectData = [
              
                {
                    name: "category",
                    value: "Division A"
                },

                {
                    name: "category",
                    value: "Division B"
                },

                {
                    name: "category",
                    value: "Division C"
                }

            ]


            // getCategoryPlayers
            const getCategoryPlayers = (value) => {
                const filteredPlayers = players.filter((player) => player.category == value);
                return filteredPlayers;
            }

            
            const handleValidateForm = (formData) => {
                const formErrors = uploadValidate(formData);
                setErrors(formErrors);
                return formErrors;
            }

            
            const sendToMail = async (formData) => {
                try {
                    await axios.post('/api/resultsmail', formData);
                } catch (err) {
                    console.log(err);
                }
            };
            

            const submitForm = async () => {

                setLoading(true);
                try {
            
                    // Upload to DB and Send to Email
                    const response = await api.post("/result", formData);
                    toast.success(response?.data?.message, {
                        autoClose: 5000,
                    });
            
                    sendToMail(formData);
                    setIsDataCorrect(true);
            
                    // Remove the Form inputs
                    setTimeout(() => {
                    setIsDataCorrect(false);
                    setFormData({
                        category: "",
                        round: "",
                        winner: "",
                        loser: "",
                        winner_score: 0,
                        loser_score: 0,
                        agreed: false,
                    });
            
                    router.push({
                        pathname: "/resultpool/successful",
                    });
                    }, 2000);
                } catch (error) {
                    toast.error(error?.response?.data?.error, {
                        autoClose: 5000,
                    });
                    setIsDataCorrect(false);
                } finally {
                    setLoading(false);
                }
                
            };

            // Updated handleFormSubmit function
            const handleFormSubmit = async (e) => {
                e.preventDefault();

                let formErrors = handleValidateForm(formData);

                if(isChecked && isVerified) {
                    formErrors = {}
                }

                // Check for validation errors
                if (Object.keys(formErrors).length === 0) {
                    await submitForm();
                }
            };

            
            const autoCheckAndSubmit = async () => {
                if (!isVerified) {
                    setIsChecked(true);
                    setFormData({ ...formData, agreed: isChecked });

                    // Call the submitForm function to submit the form
                    await submitForm();
                }
            };
            
            

            const validateLoserUID = () => {
                if (!loser_uid) {
                    setLoserError(`${formData.loser}'s Unique Key is Required`);
                    return false;
                } else if (loser_uid.trim().length === 0) {
                    setLoserError(`Input ${formData.loser}'s Unique Key`);
                    return false;
                } else if (loser_uid.length < 4 || loser_uid <= 0) {
                    setLoserError(`${formData.loser}'s Unique Key must be 4 digits`);
                    return false;
                }
                return true;
                };
                
                const handleVerifyUpload = async (e) => {
                e.preventDefault();
                
                if (validateLoserUID()) {
                    setLoading(true);
                
                    try {
                    const response = await api.post("/result/verify-loser", {
                        loser_name: formData.loser,
                        loser_uid: loser_uid,
                    });
                
                    toast.success(response?.data?.message, {
                        autoClose: 2000,
                    });
                
                    setIsVerified(true);
                    setShowVerify(false);
                    setLoserUID(0);

                    // Automatically submit form
                    await autoCheckAndSubmit();

                    } catch (error) {
                    const { response } = error;
                    toast.error(response?.data?.error, {
                        autoClose: 2000,
                    });
                    } finally {
                    setLoading(false);
                    }
                }
                };
                

                const handleChecked = () => {
                if (!isVerified) {
                    // Clear the checkbox-related error
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        agreed: '',
                    }));

                    // If not verified, show the verification modal
                    setShowVerify(true);
                } 
            };




        const verifyInput = [
            {   
                element: "input",
                show: true,   
                type: "number",
                name: "loser_uid",
                label: `Enter ${formData.loser}'s Unique Key`,
                placeholder: "E.g. 1234",
                error: loserError,
                value: loser_uid,
                handleChange: (e)  => setLoserUID(e.target.value),
            },
        ]

        const inputs = [
            {   
                element: "select",
                name: "category",
                label: "Select a Category",
                data: selectData,
                defaultValue: "Choose a Category",
                error: errors.category,
                value: formData.category,
                handleChange: (e)  => {
                    const value = e.target.value;
                    const newPlayers = getCategoryPlayers(value);
                    setFilteredPlayers(newPlayers);
                    setFormData({...formData, category: value});
                }
            },

            {   
                element: "select",
                name: "round",
                label: "Select a Round",
                data: selectRounds,
                defaultValue: "Choose a Round",
                error: errors.round,
                value: formData.round,
                handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
            },

            {   
                element: "select",
                name: "winner",
                label: "Select Round Winner",
                data: filteredPlayers,
                defaultValue: "Choose a Player",
                error: errors.winner,
                value: formData.winner,
                handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
            },

            {   
                element: "input",
                show: true,   
                type: "number",
                name: "winner_score",
                label: "Winner Score",
                placeholder: "E.g. 1234",
                error: errors.winner_score,
                value: formData.winner_score,
                handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
            },


            {   
                element: "select",
                name: "loser",
                label: "Select Round Loser",
                data: filteredPlayers,
                defaultValue: "Choose a Player",
                error: errors.loser,
                value: formData.loser,
                handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
            },


            {   
                element: "input",
                show: true,   
                type: "number",
                name: "loser_score",
                label: "Loser Score",
                placeholder: "E.g. 1234",
                error: errors.loser_score,
                value: formData.loser_score,
                handleChange: (e)  => setFormData({...formData, [e.target.name]: e.target.value} ),
            }

        ]

     

        
    return (
        
        <section className={`relative lg:p-0 p-5 my-6 lg:my-20`}>

            {isDataCorrect && <ResponseData response={isDataCorrect} message={isDataCorrect ? "Result Submited Sucessfully" : "Unable to Submit Result"}/>}

            <form method="post" onSubmit={handleFormSubmit} disabled={loading} className={`${isDataCorrect ? "blur-sm" : ""}`}>
                <div data-aos="zoom-in" data-aos-duration="3000" className={`lg:max-w-[50%] lg:mx-auto my-4 auth-bg container mx-auto bg-black rounded-md py-4 px-6 lg:px-16 shadow-lg shadow-secondary border-2 border-solid border-secondary`}>
                    <AuthHeader title={"Upload Result"} miniTitle={`Fill the following fields properly to upload your result`}/>
                    
                    <div className="w-full grid gap-6 mb-4 sm:grid-cols-2">
    
                    {
                            inputs.map((input, i) => (
                                <InputBox key={i} {...input}/>
                            ))
                    } 

                    <label className="block text-sm font-medium text-[#cdcdcd] col-span-2">
                            <input type={"checkbox"} name={"agreed"} className={`bg-[#f2f2f2] !border-[rgba(238,76,76,0.85)] ${errors.agreed ? "!border-[rgba(238,76,76,0.85)]" : "border-[rgba(0,0,0,0.5)]"}  text-[#cdcdcd] text-sm rounded-sm focus-within:ring-blue-600 focus-within:border-blue-600 mx-2`}  checked={isChecked} onChange={handleChecked}/>
                            I consent that the data filled by the Winner are correct.
                        {!isChecked && errors.agreed && <p className="text-sm text-[rgba(238,76,76,0.85)] my-2">{errors.agreed}</p>} 
                    </label>

                    </div>
                        <div className="flex justify-end items-end flex-col">
                            <button type="submit" className={`bg-[rgba(61,177,49,1)] text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 text-center `} disabled={loading}>
                        {loading ? 
                            <div className="w-4 h-4 border-[1px] border-black animate-spin text-center rounded-full p-3"></div>
                            :
                                "Submit"
                            } 
                        </button>
                    </div>
                </div>
            </form>

            {
                        showVerify && 
                        <div className="z-[20000] bg-[rgba(0,0,0,0.8)] py-20 lg:py-40 px-4 w-full fixed inset-0 h-screen ">
                            <div className="w-full flex justify-end items-end flex-col absolute top-2 right-6">
                                <i className="cursor-pointer ri-close-fill text-2xl lg:text-4xl text-[rgba(38,185,78,0.9)] font-semibold" onClick={() => setShowVerify(false)}></i>
                            </div>
                            <div data-aos="zoom-in" data-aos-duration="3000" className={`lg:max-w-[50%] h-[35%] lg:h-[45%] xl:h-[60%] lg:mx-auto my-4 auth-bg  container mx-auto bg-black rounded-md py-4 px-6 lg:px-16 shadow-lg shadow-[rgba(38,185,78,0.9)] border-2 border-solid border-[rgba(38,185,78,0.9)]`}>
                                {
                                    verifyInput.map((input, i) => (
                                        <InputBox key={i} {...input}/>
                                    ))
                                } 

                                <div className="flex justify-end items-end flex-col lg:mt-2 mt-4">
                                        <button type="submit" className={`bg-[rgba(38,185,78,0.9)] text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center `} disabled={loading} onClick={(e) => handleVerifyUpload(e)}>
                                    {loading ? 
                                        <div className="w-4 h-4 border-[1px] border-black animate-spin text-center rounded-full p-3"></div>
                                        :
                                            "Verify Upload"
                                        } 
                                    </button>
                                </div>
                            </div>

                        </div>
      
                    } 

            <ToastContainer className={"!z-[400000]"}/>
        </section>


    )
}

export default Upload

