export type Payment = {
    id?: string; //opcional pois será adicionado na camada business
    amount: number;
    type: 'credit_card' | 'boleto' | "invalid"; 
    boleto_number?: string; 
      card_holder?: string;
      card_number?: string;
      card_expiration_date?: string;
      card_cvv?: string;
    client_id?: string; 
    status?: 'pending' | 'authorized' | 'paid' | 'refunded' | 'chargedback'; 

}