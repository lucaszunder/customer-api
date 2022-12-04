# customer-functions

Esta aplicacão é uma api para clientes construída para ser implementada em arquiteturas serverless, utilizando AWS Lambda.

O projeto foi idealizado para ser executado de maneira totalmente local, utilizando ferramentas como Terraform integrado ao localstack.

>Esta integracão é uma arma poderosa para gerar economia em grandes empresas, que utilizam a AWS para realizar testes em ambientes mais básicos (lab / dev)

Em Staging ainda recomendo a utilizacão da infra na própria AWS para ter um ambiente mais próximo de producão.

## Executando o projeto

Para executar este projeto é necessário que você possua instalado em sua máquina a cli do Terraform e do docker-compose.


Na raiz do projeto você encontrará .... json com os requests

## infra

Neste projeto utilizei os módulos APIGateway Lambda DynamoDb Iam e S3 da AWS. Os módulos são construídos via Terraform no ambiente local via LocalStack.

## Schema básico

Apesar do DynamoDB ser um banco chave valor e possuir um schema própriamente dito, a ideia é que através desses lambdas, o banco seja populado com essa estrutura:

```
Customer

id: uuid;
name: string;
email:string;
```

Melhorias a serem realizadas:
- Seguranca do Api Gateway - utilizacão de firewall e restricão filtro de parâmetros para as rotas;
- Seguranca geral - Validar todos os inputs que são utilizados para buscas no dynamo com Regex ou solucão própria para validacão (tipo Joi);
- Aumentar a cobertura de testes - Apenas testes básicos foram feitos.
- Endpoint
  - list - Uma melhoria a ser implementada seria a paginacão dos dados.
  - list - Search -> Atualmente ele performa um scan em todo a base do Dynamo, algo nada performático e custoso. Porém como não temos features como o cloudsearch e também seria trabalhoso configurar um elasticsearch só para este endpoint. Optei por não faze-lo no momento.
- Poderia ser criado um módulo cloudwatch e uma camada de logger na aplicacão para o envio dos logs para ele. 
- Para producão não esquecer de configurar o x-ray para monitorar as requests.

