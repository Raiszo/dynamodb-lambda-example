export interface ICustomer {
	email: string
	document: string
	name: string
	last_name: string
}

export interface ICustomerRepo {
	getByEmail(email: string): Promise<ICustomer>
	// getByDocument(document: string, document_type: string): Promise<ICustomer>
}
