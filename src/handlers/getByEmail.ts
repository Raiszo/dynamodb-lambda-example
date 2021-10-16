import 'source-map-support/register';
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getByEmail } from '../use-cases';
import { CustomerRepo } from '../repos/customer-repo';


const repo = new CustomerRepo()

export async function handler(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
    console.log(JSON.stringify(event, null, 4))

	// get from dynamodb by email (partition key)
	const customer = await getByEmail(repo, <string>event.pathParameters?.email)

	return {
		statusCode: 200,
		body: JSON.stringify(customer),
	}
}
