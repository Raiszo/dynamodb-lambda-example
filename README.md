# dynamodb-lambda-example

# Use cases
- create customer
- get customer by email (pk)
- get customer by document number and document type
- update a customer
- delete a customer

# Considerations
- We need uniqueness by email, which is guaranteed by the partition key, and by document, the latter being difficult because of how dynamodb works. To have a second truly unique column the implementation from [this](https://aws.amazon.com/es/blogs/database/simulating-amazon-dynamodb-unique-constraints-using-transactions/) blogpost was followed.
- The schema that is exposed thorugh the api is different from the on that the db uses. In the api `document_number` and `document_type` are different attributes but in the database they are merged into a single one: `document`.
