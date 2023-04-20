import { Payment } from "../models/PaymentDTO";
import { BaseDataBase } from "./BaseDataBase";

export class PaymentDatabase extends BaseDataBase {
    private static TABLE = "payments"

    createPayment = async (payment: Payment) => {
        try {
            await BaseDataBase.connection(`${PaymentDatabase.TABLE}`)
                .insert(payment)
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);

        }
    }

    getPaymentById = async (id: string):Promise<Payment> => {
        try {
            let result = await BaseDataBase.connection(PaymentDatabase.TABLE)
                .select()
                .where({ id })
            return result[0]
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    getPaymentByUserId = async (clientId: string) => {
        try {
            let result = await BaseDataBase.connection(PaymentDatabase.TABLE)
                .select()
                .where('client_id', clientId)
                if (result.length === 0) {
                    return null;
                }
            return result
        } catch (error: any) {
            throw new Error(error.message || error.sqlMessage);
        }
    }

    updatePaymentStatus = async (id: string, status: string): Promise<void> => {
        try {
            await BaseDataBase.connection(`${PaymentDatabase.TABLE}`)
                .where({ id })
                .update({ status });
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    deletePayment = async(id:string):Promise<void> => {
        try {
            await BaseDataBase.connection(PaymentDatabase.TABLE)
            .delete()
            .where({id})
        } catch (error:any) {
            throw new Error(error.sqlMessage || error.message);      
        }
    }


}