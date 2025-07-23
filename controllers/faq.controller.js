import Faq from "../models/faqs.model.js";

export const createFaq =  async(req,res) =>{
    //get Post method data from user
    const getFaq = req.body;
    //check for if we got all data
    if(!getFaq.question || !getFaq.ans){
        return res.status(400).json({success: false, message: "Please provide all fields"});
    }
    const newFaq = new Faq(getFaq);
    try{
        await newFaq.save();
        return res.status(200).json({success: true, data: newFaq});
    }catch(err){
        console.error("Error in creation of FAQs : " + err.message);
        return res.status(500).json({success: false, message: "Server Error"});
    }
}

export const getAllFaq = async(req,res) => {
    try{
        const faqs = await Faq.find({});
        res.status(200).json({success: true, data: faqs});
    }catch(error){
        console.error("error in fetching faq", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

export const deleteFaq = async(req,res) => {
    const {id} = req.params;
    if(!id)res.status(400).json({success: false, message: "Please provide all Fields"});
    try{
        await Faq.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Faq deleted"});
    }catch(error){
        res.status(404).json({success: false, message: "Please provide correct objectID"});
    }
}

export const updateFaq = async (req, res) => {
    const { id } = req.params;
    const { question, ans } = req.body; // Destructure fields directly from the request body

    // Validate input fields
    if (!question && !ans) {
        return res.status(400).json({
            success: false,
            message: "Please provide at least one of the fields: question or ans."
        });
    }

    try {
        // Step 1: Find the FAQ by ID
        const findFaq = await Faq.findById(id);
        if (!findFaq) {
            return res.status(404).json({
                success: false,
                message: `No FAQ found with ID: ${id}`
            });
        }

        // Step 2: Prepare the new values
        const updatedFaq = await Faq.findByIdAndUpdate(
            id,
            {
                question: question || findFaq.question,  // Use existing value if not provided
                ans: ans || findFaq.ans  // Use existing value if not provided
            },
            { new: true } // Ensure the updated document is returned
        );

        // Step 3: Return the updated FAQ
        return res.status(200).json({
            success: true,
            data: updatedFaq
        });

    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


