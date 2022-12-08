resource "aws_lambda_function" "createcustomer" {
  function_name    = "createcustomer"
  role             = var.iam_role_arn
  filename         = "build.zip"
  source_code_hash = filebase64sha256("build.zip")
  runtime          = "nodejs16.x"
  handler          = "application/Lambdas/create.handler"
  publish          = true
}

resource "aws_lambda_function" "updatecustomer" {
  function_name    = "updatecustomer"
  role             = var.iam_role_arn
  filename         = "build.zip"
  source_code_hash = filebase64sha256("build.zip")
  runtime          = "nodejs16.x"
  handler          = "application/Lambdas/update.handler"
  publish          = true
}

resource "aws_lambda_function" "listcustomer" {
  function_name    = "listcustomer"
  role             = var.iam_role_arn
  runtime          = "nodejs16.x"
  handler          = "application/Lambdas/list.handler"
  filename         = "build.zip"
  source_code_hash = filebase64sha256("build.zip")
  publish          = true
}

resource "aws_lambda_function" "getcustomer" {
  function_name    = "getcustomer"
  role             = var.iam_role_arn
  runtime          = "nodejs16.x"
  handler          = "application/Lambdas/get.handler"
  filename         = "build.zip"
  source_code_hash = filebase64sha256("build.zip")
  publish          = true
}

resource "aws_lambda_function" "deletecustomer" {
  function_name    = "deletecustomer"
  role             = var.iam_role_arn
  runtime          = "nodejs16.x"
  handler          = "application/Lambdas/delete.handler"
  filename         = "build.zip"
  source_code_hash = filebase64sha256("build.zip")
  publish          = true
}
