
export const uploadValidate = (formData) => {

    let errors = {};

    if(!formData.category){
        errors.category = "Category is Required";
    } else if(formData.category.trim().length == 0) {
        errors.category = "Choose a Category";
    }


    if(!formData.round){
        errors.round = "Round is Required";
    } else if(formData.round.trim().length == 0) {
        errors.round = "Select a Round";
    }


    if(!formData.winner){
        errors.winner = "Winner is Required";
    } else if(formData.winner.trim().length == 0) {
        errors.winner = "Choose a Player";
    } else if(formData.winner == formData.loser){
        errors.winner = "Winner and Loser cannot be same";
    }


     if(!formData.loser){
        errors.loser = "Loser is Required";
    } else if(formData.loser.trim().length == 0) {
        errors.loser = "Choose a Player";
    } else if(formData.winner == formData.loser){
        errors.loser = "Winner and Loser cannot be same";
    }

    if(!formData.winner_score){
        errors.winner_score = "Winner's Score is Required";
    } else if(formData.winner_score.trim().length == 0) {
        errors.winner_score = "Input Score"
    } else if(formData.winner_score.length < 3 || formData.winner_score <= 0){
        errors.winner_score = "Score must be atleast 3 numbers & above 0"
    }


    if(!formData.loser_score){
        errors.loser_score = "Loser's Score is Required";
    } else if(formData.loser_score.trim().length == 0) {
        errors.loser_score = "Input Score"
    } else if(formData.loser_score.length < 3 || formData.loser_score <= 0){
        errors.loser_score = "Score must be atleast 3 numbers & above 0"
    }

    if(!formData.agreed || formData.agreed == false){
        errors.agreed = "Consent Agreement is Required";
    }  
    return errors;
}