resource "aws_api_gateway_rest_api" "api" {
  name = "customerapi"
}

resource "aws_api_gateway_resource" "customers" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_rest_api.api.root_resource_id
  path_part   = "customers"
}

resource "aws_api_gateway_resource" "customers_id" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  parent_id   = aws_api_gateway_resource.customers.id
  path_part   = "{id+}"
}

resource "aws_api_gateway_method" "createcustomer" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.customers.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "createcustomer" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.customers.id
  http_method             = aws_api_gateway_method.createcustomer.http_method
  type                    = "AWS_PROXY"
  uri                     = var.lambda_createcustomer_invokearn
  integration_http_method = "POST"
}

resource "aws_api_gateway_method" "getcustomer" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.customers_id.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "getcustomer" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.customers_id.id
  http_method             = aws_api_gateway_method.getcustomer.http_method
  type                    = "AWS_PROXY"
  uri                     = var.lambda_getcustomer_invokearn
  integration_http_method = "POST"
}

resource "aws_api_gateway_method" "listcustomer" {
  resource_id             = aws_api_gateway_resource.customers.id
  rest_api_id   = aws_api_gateway_rest_api.api.id
  http_method   = "GET"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "listcustomer" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  http_method             = aws_api_gateway_method.listcustomer.http_method
  resource_id             = aws_api_gateway_resource.customers.id
  type                    = "AWS_PROXY"
  uri                     = var.lambda_listcustomer_invokearn
  integration_http_method = "POST"
}

resource "aws_api_gateway_method" "deletecustomer" {
  rest_api_id   = aws_api_gateway_rest_api.api.id
  resource_id   = aws_api_gateway_resource.customers_id.id
  http_method   = "DELETE"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "deletecustomer" {
  rest_api_id             = aws_api_gateway_rest_api.api.id
  resource_id             = aws_api_gateway_resource.customers_id.id
  http_method             = aws_api_gateway_method.deletecustomer.http_method
  type                    = "AWS_PROXY"
  uri                     = var.lambda_deletecustomer_invokearn
  integration_http_method = "POST"
}


resource "aws_api_gateway_deployment" "main" {
  rest_api_id = aws_api_gateway_rest_api.api.id
  stage_name  = "main"
  depends_on = [
    aws_api_gateway_method.createcustomer,
    aws_api_gateway_integration.createcustomer,
    aws_api_gateway_method.getcustomer,
    aws_api_gateway_integration.getcustomer,
    aws_api_gateway_method.listcustomer,
    aws_api_gateway_integration.listcustomer,
    aws_api_gateway_method.deletecustomer,
    aws_api_gateway_integration.deletecustomer,
  ]
}
