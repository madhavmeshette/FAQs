import express from 'express'
import { createFaq,getAllFaq,deleteFaq, updateFaq } from '../controllers/faq.controller.js';
const faqRoute = express.Router();

faqRoute.post('/create', createFaq);
faqRoute.get('/',getAllFaq);
faqRoute.delete('/deleteFaq/:id',deleteFaq);
faqRoute.put('/update/:id',updateFaq);

export default faqRoute;