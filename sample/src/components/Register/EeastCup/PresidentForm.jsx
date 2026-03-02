import { useState } from "react";
import { RegisterContext } from "../contexts/RegisterContext";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import the icons you need
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { validateStepOne, validateSecondStep, validateThirdStep, validateFinalStep } from "../validation/validate";
import Stepper from "../Auth/Stepper";
import StepperControl from "../Auth/StepperControl";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import AuthHeader from  "../Auth/AuthHeader";
import ResponseData from "../Response/Response";
import Spinner from "../../Spinner/Spinner";
import { useRouter } from "next/router";


function PresidentForm() {

    const [currentStep, setCurrentStep] = useState(1);
    const router = useRouter();

    const [formData, setFormData] = useState({
        surname: "",
        firstname: "",
        email: "",
        gender: "",
        nsf_rating: "",
        registration_band: "",
        meal_one: "",
        meal_two: "",
        amount_payed: "",
        phone_no: "",
        agreed: false,
    });

    const [errors, setErrors] = useState({});
    const [response, setResponse] = useState({
        success: false,
        message: null,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const steps = [
        "Step 1",
        "Step 2",
        "Complete",
    ];

    const handleStepOne = () => {
        const formErrors = validateStepOne(formData);
        setErrors(formErrors);
        return formErrors;
    }

    const handleSecondStep = () => {
        const formErrors = validateSecondStep(formData);
        setErrors(formErrors);
        return formErrors;
    }

    const handleThirdStep = () => {
        const formErrors = validateThirdStep(formData);
        setErrors(formErrors);
        return formErrors;
    }



     const validateForm = (currentStep) => {
        switch (currentStep) {
            case 1:
                return handleStepOne();
                
            case 2:
                return handleSecondStep();
                
            case 3:
                return handleThirdStep();

            default:
                break;
        }
  };


    const displayStep = (step) => {
        switch (step) {
            case 1:
                return <FirstStep/>
            case 2:
               return <SecondStep/>

            case 3: 
               return <ThirdStep/>
              
            default:
                break;
        }
    }

        //handleFormSubmit
    const handleFormSubmit = async (formErrors) => {
        if (Object.keys(formErrors).length === 0 && currentStep == steps.length) {
            try {
                setLoading(true);

                setTimeout(() => {
                    router.push({
                    pathname: "/payment",
                    query: { data: JSON.stringify(formData) },
                    });
                }, 2000);
                } catch (err) {
                console.log(err);
                } finally {
                setLoading(false);
            }
        }
    };







    const handleCloseModal = () => {
        setIsSubmitted(false);
        setCurrentStep(1);
        setFormData({
            surname: "",
            firstname: "",
            email: "",
            gender: "",
            nsf_rating: "",
            registration_band: "",
            meal_one: "",
            meal_two: "",
            amount_payed: "",
            phone_no: "",
            agreed: false,
        });
    }
    

     const handleClick = (direction) => {
        if (currentStep != null && currentStep != undefined) {
            const formErrors = validateForm(currentStep);

            if(Object.keys(formErrors).length === 0){
                let newStep = currentStep;
                direction === "next" ? newStep++ : newStep--;
                //check if steps are within bound
                newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

                handleFormSubmit(formErrors);
                
            } else {
                setCurrentStep(currentStep);
            }
        }
    }

    const presidentContext = { formData, setFormData, errors, setErrors };

    return (
        <RegisterContext.Provider value={presidentContext}>
            {isSubmitted && 

                <div className="flex justify-center items-center flex-col fixed z-20 p-6 left-0 top-0 bottom-0 right-0 w-full h-full bg-[rgba(0,0,0,0.8)]">
                    <FontAwesomeIcon icon={faClose}  style={{ fontSize: 30, color: 'white', fontWeight: 'bolder' }} className="carousel_btn close" onClick={handleCloseModal}/>

                    <ResponseData response={response.success} message={response.message}/>
                </div>
            }
             
               {loading && <Spinner/>}
            <div data-aos="zoom-in" data-aos-duration="3000" className={`lg:max-w-[50%] lg:mx-auto my-4 rounded-sm p-8`}>
            
                
                
                <AuthHeader title={"Registration Form"} miniTitle={""}/>
                <Stepper 
                    steps={steps}
                    currentStep={currentStep}
                    />

                <div className="container mx-auto bg-black rounded-md py-4 px-6 lg:px-16 shadow-lg shadow-primary border-2 border-solid border-secondary">

                    <StepperControl 
                        handleClick={handleClick}
                        currentStep={currentStep}
                        steps={steps}
                        isDisabled={loading}
                    />

                    { displayStep(currentStep) }
                
                </div>
            </div>
        </RegisterContext.Provider>
    )
}

export default PresidentForm

