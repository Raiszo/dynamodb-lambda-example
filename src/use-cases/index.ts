import { ICustomerRepo } from '../contracts'

export async function getByEmail(repo: ICustomerRepo, email: string) {
	const customer = await repo.getByEmail(email)

	return customer
}

export async function getByDocument(repo: ICustomerRepo, document: string, document_type: string) {
	const customer = await repo.getByDocument(document, document_type)

	return customer
}

