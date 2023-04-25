import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import CustomerService from '../../service'
//import middyJsonBodyParser from '@middy/http-json-body-parser';


export const getAllCustomers = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const todos = await CustomerService.getAllCustomer();
    return formatJSONResponse ({
        todos
    })
})

export const createCustomer = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = v4();
        const todo = await CustomerService.createCustomer({
            custid:id,
            name:"",
            addr:"",
            phno:0
            
            
        })
        return formatJSONResponse({
            todo
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})
