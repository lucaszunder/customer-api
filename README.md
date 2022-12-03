# customer-functions

Necessário a instalacao do Terraform e do Docker-compose - AWS-local

https://github.com/localstack/awscli-local


aws --endpoint-url=http://localhost:4566 lambda invoke --function-name listcustomer --payload='{}' out --log-type Tail


``` 
aws --endpoint-url=http://localhost:4566 s3api create-bucket \
  --bucket customer
```

terraform init

GET /customers/:id
PUT /customers/:id    
DELETE /customers/:id
GET /customers    -> ?query para
query busca por qualquer texto em todos os campos


API Gateway
Lambda
DynamoDB



Customer

id: uuid
name: string
email:string




● Unit testing or test automation
● Infrastructure automation in AWS (Serverless is our preferred framework)
● Use AWS Lambda for all backend controllers
● API endpoint security
● Configure a CI/CD pipeline
● API documentation
● Logging, monitoring and auditing
