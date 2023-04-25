import { DynamoDBClient,ScanCommand,ScanCommandInput,CreateTableCommand,CreateTableCommandInput } from "@aws-sdk/client-dynamodb";
import { GetItemCommand,GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import Customer from "../models/Customer";

//const client = new DynamoDBClient({ region: "us-east-1"});

export default class CustomerService {

    public Tablename: string = "Customer";

    constructor(private client: DynamoDBClient) { }


 params: ScanCommandInput = {
    TableName:this.Tablename
    };
  
 getAllCustomer=async function () {
      try {
          const results = await this.client.send(new ScanCommand(this.params));
          console.log(results)
      } catch(err) {
          console.error(err)
      }
  };


   input: CreateTableCommandInput = {
    TableName : this.Tablename,
    KeySchema: [       
        { AttributeName: "id", KeyType: "HASH"},    //Partition key
        { AttributeName: "name", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "id", AttributeType: "N" },
        { AttributeName: "name", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 100
    }
};

createCustomer = async function (customer:Customer) {
    try {
        const results = await this.client.send(new CreateTableCommand(this.customer));
        console.log(results)
    } catch(err) {
        console.error(err)
    }
};


params1: GetItemCommandInput = {
    TableName: this.Tablename,
    
    Key:({
      "id": {N:"101"}
     
    }),
  };
  
  getCustomerById = async function () {
      try {
          const results = await this.client.send(new GetItemCommand(this.params1));
          console.log(results)
      } catch(err) {
          console.error(err)
      }
  };
  

}