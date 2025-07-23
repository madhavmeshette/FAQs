import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    ans: {
        type: String,
        required: true
    }
},{
    timestamps : true
});

const Faq = mongoose.model('Faq',faqSchema);

export default Faq;