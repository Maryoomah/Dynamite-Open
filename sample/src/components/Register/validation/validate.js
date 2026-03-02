
export const validateStepOne = (formData) => {
        
    let errors = {};

    if(!formData.surname){
        errors.surname = "Surname is Required";
    } else if(formData.surname.trim().length == 0) {
        errors.surname = "Must contain atleast a character"
    }

    if(!formData.firstname){
        errors.firstname = "Firstname is Required";
    } else if(formData.firstname.trim().length == 0) {
        errors.firstname = "Must contain atleast a character"
    }

    if(formData.phone_no != undefined && !formData.phone_no && !formData.phone_no == ""){
        errors.phone_no = "Phone Number is Required";
    } else if(formData.phone_no != undefined && formData.phone_no == "" && formData.phone_no.trim().length < 14) {
        errors.phone_no = "Phone Number is invalid"
    }

    if(!formData.gender){
        errors.gender = "Gender is Required";
    } else if(formData.gender.trim().length == 0) {
        errors.gender = "Must contain atleast a character"
    }
    return errors
};

export const validateSecondStep = (formData) => {
    let errors = {}

    if(!formData.email){
        errors.email = "Email is Required";
    } else if(!/\S+@\S+\.\S+/.test(formData.email)){
        errors.email = "Email is Invalid";
    }

    if(!formData.registration_band){
        errors.registration_band = "Badge is Required";
    } else if(formData.registration_band.trim().length == 0) {
        errors.registration_band = "Choose a Badge"
    }

    if(!formData.meal_one){
        errors.meal_one = "Meal Day One is Required";
    } else if(formData.meal_one.trim().length == 0) {
        errors.meal_one = "Choose a Meal"
    }

    if(!formData.meal_two){
        errors.meal_two = "Meal Day Two is Required";
    } else if(formData.meal_two.trim().length == 0) {
        errors.meal_two = "Choose a Meal"
    }

     if(!formData.amount_payed){
        errors.amount_payed = "Amount Payable is Required";
    } else if(formData.amount_payed.trim().length == 0) {
        errors.amount_payed = "Must contain atleast a character"
    }


    return errors

 }


 export const validateThirdStep = (formData) => {

    let errors = {}
    
    if(!formData.agreed || formData.agreed == false){
        errors.agreed = "Terms and Condition Agreement is Required";
    }   
    return errors

 }



