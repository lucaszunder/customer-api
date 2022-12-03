resource "aws_lambda_function" "upsertcustomer" {
  function_name    = "upsertcustomer"
  role             = var.iam_role_arn
  filename         = "build.zip"
  source_code_hash = filebase64sha256("build.zip")
  runtime          = "nodejs16.x"
  handler          = "src/application/Lambdas/upsert.handler"
  publish          = true
}

resource "aws_lambda_function" "listcustomer" {
  function_name    = "listcustomer"
  role             = var.iam_role_arn
  runtime          = "nodejs16.x"
  handler          = "src/application/Lambdas/list.handler"
  filename         = "build.zip"
  source_code_hash = filebase64sha256("build.zip")
  publish          = true
}

resource "aws_lambda_function" "getcustomer" {
  function_name    = "getcustomer"
  role             = var.iam_role_arn
  runtime          = "nodejs16.x"
  handler          = "/src/application/Lambdas/get.handler"
  filename         = "build.zip"
  source_code_hash = filebase64sha256("build.zip")
  publish          = true
}

resource "aws_lambda_function" "deletecustomer" {
  function_name    = "deletecustomer"
  role             = var.iam_role_arn
  runtime          = "nodejs16.x"
  handler          = "/src/application/Lambdas/delete.handler"
  filename         = "build.zip"
  source_code_hash = filebase64sha256("build.zip")
  publish          = true
}
