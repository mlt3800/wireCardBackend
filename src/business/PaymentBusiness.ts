import { PaymentDatabase } from "../database/PaymentsData";
import { Payment } from "../models/PaymentDTO";
import { IdGenerator } from "../services/IdGenerator";
import { validateCreditCardNumber } from "../services/CreditCardOn";
import { generateBoleto } from "../services/Boletos";
import { number } from "card-validator";

const idGenerator = new IdGenerator();
export class PaymentBusiness{
    paymentDataBase: PaymentDatabase;
    constructor(paymentDataBase: PaymentDatabase){
        this.paymentDataBase = paymentDataBase;
    }
    paymentProcess = async (payment: Payment) => {
        if (payment.type !== 'boleto' && payment.type !== 'credit_card') {
            throw new Error('Invalid payment type');
}
if (payment.amount<= 0){
    throw new Error('Invalid payment amount');
}
if (!payment.client_id){
    throw new Error('Invalid payment client_id');
}
 if (payment.type === 'credit_card' && (!payment.card_holder || !payment.card_number || !payment.card_expiration_date || !payment.card_cvv)){
    throw new Error('Invalid credit card payment');
 }
let creditCardNumber = payment.card_number as string;
let cardData = number;

 
      
}}