import { useContext } from "react";
import { RegisterContext } from "../contexts/RegisterContext.jsx";
import InputBox from "../Auth/InputBox.jsx";
import Payments from "../Payments/Payments"

const FinalStep = () => {

   const { formData, setFormData, errors } = useContext(RegisterContext);



  return (
        <form  className="w-full py-6 lg:py-8">
            <h3 className="mb-4 text-xl font-bold leading-none text-deep">Step 4</h3>
                
                  
        </form>
  );
};

export default FinalStep;