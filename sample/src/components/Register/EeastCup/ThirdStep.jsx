 import {  useContext} from "react";
import { RegisterContext } from "../contexts/RegisterContext.jsx";


const ThirdStep = () => {

   const { formData, setFormData, errors } = useContext(RegisterContext);

 
    return (
        <form  className="w-full py-6 lg:py-8">
            <h3 className="mb-4 text-xl font-bold leading-none text-white">Step 3</h3>
                <div className="bg-black rounded-md p-4 border-2 border-gold my-6">
                    <ul className="my-2 text-white flex flex-col items-center gap-2">
                        <h3 className="font-bold text-white">Welcome to Janet Adowei
                            Memorial Scrabble Classics (JAMSC) Tournament. By registering for the tournament, you agree to the following terms and conditions:</h3>

                        <li className="text-xs">1. Eligibility: The tournament is open to all NSF Licensed players and new players without ratings. Participants must register and pay the registration fee before the deadline specified by the organizers</li>

                        <li className="text-xs">2. Conduct: Participants must behave in a respectful and sportsmanlike manner at all times. Cheating or gamesmanship conduct will result in disqualification.</li>

                        <li className="text-xs">3. Credibility: I attest that every information provided here is true, and will abide by the decisions taken by the organisers if found to be untrue.</li>

                        <li className="text-xs">4. Prizes: Prizes will be awarded to the top performers in each category, it is important to know that they are non-transferable and non-exchangeable.</li>

                        <li className="text-xs">5. Dispute Resolution: Any disputes arising from the tournament will be resolved by the tournament organizers. Their decision will be final and binding.</li>
                    </ul>

                    <label className="block text-sm font-medium text-[#cdcdcd]">
                        <input type={"checkbox"} name={"agreed"} className={`bg-[#f2f2f2] border-[rgba(255,0,0,0.85)] ${errors.agreed ? "!border-[rgba(255,0,0,0.85)]" : "border-[rgba(0,0,0,0.5)]"}  text-[#cdcdcd] text-sm rounded-sm focus-within:ring-blue-600 focus-within:border-blue-600 mx-2`} checked={formData.agreed ?  true : false} onChange={(e) => setFormData({...formData, [e.target.name]: e.target.checked})}/>
                        I Agree to the Terms and Conditions of the Tournament
                    </label>
                </div>
                {errors.agreed && <p className="text-sm text-[rgba(255,0,0,0.85)] my-2">{errors.agreed}</p>}
        </form>
  );
};

export default ThirdStep;