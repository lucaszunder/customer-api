resource "aws_dynamodb_table" "customers" {
   name             = "customers"
   billing_mode   = "PROVISIONED"
   read_capacity  = 3
   write_capacity = 3
   hash_key       = "entity"
   range_key = "customer_id"

  attribute {
     name = "entity"
     type = "S"
   }
   attribute {
     name = "customer_id"
     type = "S"
   }

   attribute {
     name = "name"
     type = "S"
   }
   attribute {
     name = "email"
     type = "S"
   }

   global_secondary_index {
    name               = "nameIndex"
    hash_key           = "entity"
    range_key          = "name"
    write_capacity     = 10
    read_capacity      = 10
    projection_type    = "ALL"
  }

    global_secondary_index {
    name               = "emailIndex"
    hash_key           = "entity"
    range_key          = "email"
    write_capacity     = 10
    read_capacity      = 10
    projection_type    = "ALL"
  }
}