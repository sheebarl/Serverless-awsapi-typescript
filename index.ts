import createDynamoDBClient from '../models/index';
import CustomerService from "./service"

const customerService = new CustomerService(createDynamoDBClient());
export default customerService;