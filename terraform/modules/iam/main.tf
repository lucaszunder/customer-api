resource "aws_iam_role" "lambda" {
  name = "customer-api-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = [
          "dynamodb.amazonaws.com",
          "lambda.amazonaws.com",
          "apigateway.amazonaws.com"
        ]
      }
      Action = "sts:AssumeRole"
    }]
  })
  }

