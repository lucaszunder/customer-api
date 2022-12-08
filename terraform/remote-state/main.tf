terraform {
  required_version = ">= 1.0.0"
    required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

}

provider "aws" {
  region                      = "us-east-1"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  s3_force_path_style         = true

  endpoints {
    s3            = "http://localhost:4566"
  }
}

resource "aws_s3_bucket" "customers" {
    bucket="customers" 
}
