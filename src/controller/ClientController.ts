import { ClientBusiness } from "../business/ClientBusiness"
import { ClienteData } from "../database/ClientsData"
import { Request,Response } from "express"
import { PaymentDatabase } from "../database/PaymentsData"
const clientDatabase = new ClienteData()
const paymentDatabase = new PaymentDatabase()
const clientsBusiness = new ClientBusiness(clientDatabase, paymentDatabase)

export class ClientController {
    register = async(req:Request, res:Response) => {
        const { name, email, cpf } = req.body
        try {
            const input = {
                name,
                email,
                cpf
            }
            const clientId = await clientsBusiness.register(input)
            
            res.status(201).send({status:"Client successfully registered",clientId:clientId})
        } catch (error:any) {
            res.send({error:error.message})
        }
    }
    getClientPayments = async (req:Request, res:Response) => {
        try {
          const { id } = req.params;

          let result = await clientsBusiness.getClientPayment(id)
      
          res.status(200).send( result );
        } catch (error:any) {
          res.status(400).send({ error: error.message });
        }
      };

      getAllClients = async(req:Request, res:Response) => {
        try {
          let response = await clientsBusiness.getAll()
          res.status(200).send(response)
        } catch (error:any) {
          res.status(404).send(error.message)
        }
      }

      deleteClient = async (req:Request, res:Response) => {
        try {
          const { id } = req.params;
          let response = await clientsBusiness.deleteClient(id)
          res.status(200).send(response)
        } catch (error:any) {
          res.send({error: error.message})
        }
      }
}