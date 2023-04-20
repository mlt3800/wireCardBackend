import { number } from "card-validator";
export const validateCreditCardNumber = (cardNumber:string) => {
    const CardNumber = cardNumber.replace(/ /g, ''); // Remove espaços em branco
    const result = number(CardNumber);
    let response = {
      isValid:result.isValid,
      issuer:result.card?.niceType || result.card?.type || "Unknown"
    }

    return response
    
  }