# e-commerce


# Product Docs
Routes| Method | Headers | Request Body | Response Data| Response Error | Description 
------|--------|---------|--------------|--------------|----------------|-------------
`/products` | POST | token | name:String **required** , price:Number **required**, description:String **required**, stock:Number **required** image:String **required**| `{_id ,name , price , description, quantity }` | 422 (validation error), 500 (internal server error)| add product data into database
`/products` | GET | token | none | `[{_id ,name , price , quantity }]` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | get list of products
`/products` | PATCH | token | name:String , price:String , description: String, quantity:Integer  | - | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | edit a product base on its id
`/products` | DELETE | token | - | - | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | delete a product base on its id
