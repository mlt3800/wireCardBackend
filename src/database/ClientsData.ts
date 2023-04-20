import { ClientDTO } from "../models/ClientDTO";
import {BaseDataBase} from "../database/BaseDataBase";

export class ClienteData extends BaseDataBase {
    private static readonly TABLE = `clients`;

    register = async(input: ClientDTO) => {
        try{
            await BaseDataBase.connection(`${ClienteData.TABLE}`).insert(input);
        } catch(error:any){
            throw new Error(error.message);
        }

    }
    getClientPayment = async(clientId:string) => {
        try{
            const result = await BaseDataBase.connection(ClienteData.TABLE).
            join('payments','clients.id','=','payments.client_id')
            .select
            ('clients.id as client_id',
            'clients.name as client_name',
            'clients.email as client_email',
            'clients.cpf as client_cpf',
            'payments.id as payment_id',
            'payments.amount',
            'payments.type',
            'payments.card_holder',
            'payments.card_number',
            'payments.card_expiration_date',
            'payments.card_cvv',
            'payments.boleto_number',
            'payments.status'
        )
        .where('clients.id', clientId);

        const client = {
            id:result[0].client_id,
            name:result[0].client_name,
            email:result[0].client_email,
            cpf:result[0].client_cpf,
            

            
        }
        const payments = result.map((row:any) => ({
            id:row.payment_id,
            amount:row.amount,
            type:row.type,
            card_holder:row.card_holder,
            card_number:row.card_number,
            card_expiration_date:row.card_expiration_date,
            card_cvv:row.card_cvv,
            boleto_number:row.boleto_number,
            status:row.status

        }));
        const data = {
            client,
            payments,
        };
        return data
    } catch (error:any) {
        throw new Error(error.sqlMessage || error.message);   
    }
}
getAll = async() => {
    try {
        let response = await BaseDataBase.connection(ClienteData.TABLE)
        .select()
        return response
    } catch (error:any) {
        throw new Error(error.sqlMessage || error.message);    
    }
}
    
    getById = async(id:string):Promise<ClientDTO> => {
        try {
            let response = await BaseDataBase.connection(ClienteData.TABLE)
            .select()
            .where({id})
            return response[0]
        } catch (error:any) {
            throw new Error(error.message || error.sqlMessage);      
        }
    }

    deleteClient = async(id:string):Promise<void> => {
        try {
            await BaseDataBase.connection(ClienteData.TABLE)
            .delete()
            .where({id})
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);      
        }
    }
}
