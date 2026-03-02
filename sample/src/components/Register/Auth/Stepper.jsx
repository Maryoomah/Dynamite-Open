import React, { useEffect, useState, useRef } from "react";


function Stepper({steps, currentStep}) {

    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();


    const updateStep = (stepNumber, steps) => {
        //
        const newSteps = [...steps];
        let count = 0;

        while(count < newSteps.length){
            //current step
            if(count === stepNumber){
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    completed: true,
                };
                count++;

                //step completed
            } else if(count < stepNumber){

                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    completed: true,
                };
                count++;


                //step pending
            } else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    completed: false,
                };
                count++;
            }

        }

        return newSteps;
    }

    useEffect(() => {
        //Create Object
        const stepsState = steps.map((step, index) => 
            Object.assign({}, 
                {
                    description: step,
                    completed: false,
                    highlighted: index === 0 ? true : false,
                    selected: index === 0 ? true : false,
            }),
        );
        
        stepRef.current = stepsState;
        const current = updateStep(currentStep - 1, stepRef.current);
        setNewStep(current);



    }, [steps, currentStep]);

    return (
        
    <ol className="bg-black border-2 border-solid border-secondary shadow-md shadow-secondary relative flex justify-around items-center my-8 py-6 rounded-md">                  
        {
           newStep.map((step, index) => (
                <li className={`relative`} key={index}>            
                    <span className={` ${step.selected ? "bg-secondary " : "bg-white "} flex items-center justify-center w-8 h-8 rounded-full left-0 right-0 lg:right-[initial] lg:-left-4 ring-4 ring-[#0b142c] font-semibold text-lg lg:text-xl p-5 text-black`}>
                        {
                            step.completed ? (
                                <span className="text-white rounded-full text-lg lg:text-xl font-bold">&#10003;</span>
                            )
                            :
                            (index + 1)
                        }
                    </span>
                </li>
           )) 
        }

    </ol>

    )
}

export default Stepper