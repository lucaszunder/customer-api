output "lambda_createcustomer_invokearn" {
  value = aws_lambda_function.createcustomer.invoke_arn
}

output "lambda_updatecustomer_invokearn" {
  value = aws_lambda_function.updatecustomer.invoke_arn
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