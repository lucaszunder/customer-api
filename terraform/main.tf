terraform {
  required_version = ">= 1.0.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }


  backend "s3" {
    bucket                      = "customers"
    key                         = "customer.tfstate"
    access_key                  = "1"
    secret_key                  = "1"
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
  region                      = "us-east-1"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  s3_force_path_style         = true

  endpoints {
    iam        = "http://localhost:4566"
    apigateway = "http://localhost:4566"
    dynamodb   = "http://localhost:4566"
    lambda     = "http://localhost:4566"
    s3         = "http://localhost:4566"
  }
}

module "iam" {
  source = "./modules/iam"
}

module "lambda" {
  source = "./modules/lambda"

  iam_role_arn = module.iam.iam_role_arn
}

module "apigateway" {
  source = "./modules/apigateway"

  lambda_createcustomer_invokearn = module.lambda.lambda_createcustomer_invokearn
  lambda_updatecustomer_invokearn = module.lambda.lambda_updatecustomer_invokearn
  lambda_listcustomer_invokearn   = module.lambda.lambda_listcustomer_invokearn
  lambda_getcustomer_invokearn    = module.lambda.lambda_getcustomer_invokearn
  lambda_deletecustomer_invokearn = module.lambda.lambda_deletecustomer_invokearn
}

module "dynamodb" {
  source = "./modules/dynamodb"
}

output "main_url" {
  description = "Endpoint do API Gateway"
  value       = module.apigateway.main_url
}