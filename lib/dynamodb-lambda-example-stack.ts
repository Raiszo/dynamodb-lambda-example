import * as path from 'path'
import { Code, Function, Runtime } from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';
import { AttributeType, BillingMode, ProjectionType, Table } from '@aws-cdk/aws-dynamodb';
import { LambdaIntegration, RestApi } from '@aws-cdk/aws-apigateway';

export class DynamodbLambdaExampleStack extends cdk.Stack {
	constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const table = new Table(this, 'customer-table', {
			partitionKey: {
				name: 'email',
				type: AttributeType.STRING
			},
			billingMode: BillingMode.PAY_PER_REQUEST,
		})

		table.addGlobalSecondaryIndex({
			indexName: 'document',
			partitionKey: {
				name: 'document',
				type: AttributeType.STRING
			},
			projectionType: ProjectionType.ALL,
		})

		const fn = new Function(this, 'function', {
			runtime: Runtime.NODEJS_14_X,
			code: Code.fromAsset(path.join(__dirname, '../src')),
			handler: 'index.handler',
			timeout: Duration.seconds(29),
			environment: {
				TABLE_NAME: table.tableName
			},
		})
		table.grantReadWriteData(fn)

		const integration = new LambdaIntegration(fn)
		const api = new RestApi(this, 'api', {
			defaultIntegration: integration
		})

		const root = api.root
		// create customer
		root.addMethod('POST')
		// get by document type and document number
		root.addMethod('GET')

		const customer = root.addResource('{email}')
		// get by email
		customer.addMethod('GET')
		// edit
		customer.addMethod('PUT')
		// delete
		customer.addMethod('DELETE')
	}
}
