# customer-functions

Esta aplicacão é uma api para clientes construída para ser implementada em arquiteturas serverless, utilizando AWS Lambda.

O projeto foi idealizado para ser executado de maneira totalmente local, utilizando ferramentas como Terraform integrado ao localstack.

> Esta integracão é uma arma poderosa para gerar economia em grandes empresas, que utilizam a AWS para realizar testes em ambientes mais básicos (lab / dev)

Em Staging ainda recomendo a utilizacão da infra na própria AWS para ter um ambiente mais próximo de producão.

## Executando o projeto

Para executar este projeto é necessário que você possua instalado em sua máquina a cli do Terraform e do docker-compose.

De inicio rode o comando:

`docker-compose -f ./development/docker-compose.yml up -d`

Este comando irá inicializar toda a estrutura do localstack. Depois disso rode o comando:

`yarn deploy:localstack`

Este comando irá

- Buildar e zipar a aplicacão;
- Criar um S3 para o remote-state no localstack;
- Criar uma role no Iam para a criacão dos lambdas no localstack;
- Criar uma tabela no DynamoDB no localstack;
- Criar um API Gateway básico no localstack;
- Criar todos os lambdas no localstack.

O Output desse comando será a URL do APIGateway que usaremos para testar a aplicacão.

Para testar a aplicacão, existe um swagger-doc na raiz do projeto. Ou você pode executar o comando:

## infra

Neste projeto utilizei os módulos APIGateway Lambda DynamoDb Iam e S3 da AWS. Os módulos são construídos via Terraform no ambiente local via LocalStack.

## Schema básico

Apesar do DynamoDB ser um banco chave valor e possuir um schema própriamente dito, a ideia é que através desses lambdas, o banco seja populado com essa estrutura:

```
Customer
entity: string; PK
id: uuid; RK
name: string;
email:string;
```

Melhorias a serem realizadas:

- Seguranca do Api Gateway - utilizacão de firewall e restricão filtro de parâmetros para as rotas;
- Seguranca geral - Validar todos os inputs que são utilizados para buscas no dynamo com Regex ou solucão própria para validacão (tipo Joi);
- Aumentar a cobertura de testes - Apenas testes básicos foram feitos.
- Melhorar mocks para respostas iguais a da AWS.
- Traduzir os erros da AWS para erros da própria aplicacão, criando uma camada de erros mais eficiente.
- Endpoint
  - list - Uma melhoria a ser implementada seria a paginacão dos dados.
- Poderia ser criado um módulo cloudwatch e uma camada de logger na aplicacão para o envio dos logs para ele.
- Para producão não esquecer de configurar o x-ray para monitorar as requests.
- CI no Github Actions
- CD no Github Actions
