const AWS = require("aws-sdk")

const dynamo = new AWS.DynamoDB.DocumentClient();
const { TABLE_NAME } = process.env

exports.handler = async (event) => {
    console.log(JSON.stringify(event, null, 4))
    const route_key = event.httpMethod + ' ' + event.resource

    let res
    let status_code = 200
    try {
	switch (route_key) {
	    case 'GET /{email}': {
		res = await dynamo
		    .get({
			TableName: TABLE_NAME,
			Key: {
			    email: event.pathParameters.email
			}
		    })
		    .promise();
		break
	    }

	    // case 'POST /': {

	    // }

	    // case 'GET /': {

	    // }

	    // case 'PUT /{email}': {

	    // }

	    // case 'DELETE /{email}': {

	    // }

	    default: {
		throw new Error(`Unsupported route: "${route_key}"`)
	    }
	}
	// res = { hello: 'world' }
    } catch (e) {
	console.log(e)
	status_code = 500
	res = e.message
    } finally {
	res = JSON.stringify(res)
    }

    return {
	statusCode: status_code,
	body: res,
    }
}
