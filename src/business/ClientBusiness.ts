import { PaymentDatabase } from "../database/PaymentsData";
import { IdGenerator } from "../services/IdGenerator";
import { ClienteData } from "../database/ClientsData";
import { ClientDTO, InputClient } from "../models/ClientDTO";

const idGenerator = new IdGenerator()
const paymentDataBase = new PaymentDatabase()

export class ClientBusiness {
    clientDataBase: ClienteData;
    paymentDataBase: PaymentDatabase;
    
    constructor(clientDataBase: ClienteData, paymentDataBase: PaymentDatabase) {
        this.clientDataBase = clientDataBase,
        this.paymentDataBase = paymentDataBase
    }
    register = async (client:InputClient) => {
        try {
            if (!client.name||!client.email||!client.cpf) {
                throw new Error("Preencha todos os campos, email,name e cpf")
                
            }
            const id = idGenerator.generateId()
            const input = {
                id,
                name:client.name,
                email:client.email,
                cpf:client.cpf
            }
            await this.clientDataBase.register(input)
            return id
        } catch (error:any) {
            throw new Error(error.message)
            
        }

}
getClientPayment = async(userId:string) => {
try {
    if (!userId) {
        throw new Error("Falta o id")
        
    }
    let client = await this.clientDataBase.getById(userId)
    if (!client) {
        throw new Error("Cliente não encontrado")
} 
let payment = await this.paymentDataBase.getPaymentById(userId)
    if (!payment) {
        throw new Error("Pagamento não encontrado")
    }
    

let response = await this.clientDataBase.getClientPayment(userId)

    return response
} catch (error:any) {
    throw new Error(error.message)
}
}
getAll = async() => {
    try{
       let response = await this.clientDataBase.getAll()
       if(response.length< 1){
        throw new Error("Cliente não encontrado")
        }
        return response
    } catch (error:any) {
        throw new Error(error.message)
    
    }
}
deleteClient = async(id:string) => {
    try{
        if (!id) {
            throw new Error("Falta o id")
        }
        let result:ClientDTO = await this.clientDataBase.getById(id)
        if (!result){
            throw new Error("Cliente não encontrado")
        }
        await this.clientDataBase.deleteClient(id)
        let response = {
            status: "success cliente deletado",
        }
        return response
    }
    catch (error:any) {
        throw new Error(error.message)
    }
}
}