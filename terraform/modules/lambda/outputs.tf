output "lambda_upsertcustomer_invokearn" {
  value = aws_lambda_function.upsertcustomer.invoke_arn
}

output "lambda_listcustomer_invokearn" {
  value = aws_lambda_function.listcustomer.invoke_arn
}

output "lambda_getcustomer_invokearn" {
  value = aws_lambda_function.getcustomer.invoke_arn
}

output "lambda_deletecustomer_invokearn" {
  value = aws_lambda_function.deletecustomer.invoke_arn
}