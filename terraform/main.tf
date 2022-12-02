terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "4.45.0"
    }
  }
  backend "s3" {
    bucket                      = "config"
    key                         = "customer_api.tfstate"
    access_key                  = "localstack"
    secret_key                  = "localstack"
    region                      = "us-east-1"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    force_path_style            = true
    endpoint                    = "http://localhost:4566"
    sts_endpoint                = "http://localhost:4566"
  }
}

provider "aws" {
  region = "us-east-1"
  access_key = "localstack"
  secret_key = "localstack"
  skip_credentials_validation = true
  skip_requesting_account_id = true
  skip_metadata_api_check = true

  endpoints {
    apigateway     = "http://localhost:4566"
    apigatewayv2   = "http://localhost:4566"
    cloudwatch     = "http://localhost:4566"
    dynamodb       = "http://localhost:4566"
    lambda         = "http://localhost:4566"
    route53        = "http://localhost:4566"
    s3             = "http://localhost:4566"
  }
}

module "dynamodb" {
  source = "./terraform/dynamodb"
}

module "lambda" {
  source = "./terraform/lambda"
}

module "apigateway" {
  source = "./terraform/apigateway"

  lambda_upsertcustomer_invokearn    = module.lambda.lambda_upsertcustomer_invokearn
  lambda_listcustomer_invokearn   = module.lambda.lambda_listcustomer_invokearn
  lambda_getcustomer_invokearn    = module.lambda.lambda_getcustomer_invokearn
  lambda_deletetarefa_invokearn = module.lambda.lambda_deletetarefa_invokearn
}

output "main_url" {
  description = "Endpoint do API Gateway"
  value       = module.apigateway.main_url
}