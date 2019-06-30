# e-commerce


# Product Docs
Routes| Method | Headers | Request Body | Response Data| Response Error | Description 
------|--------|---------|--------------|--------------|----------------|-------------
`/products` | POST | token | name:String **required** , price:Number **required**, description:String **required**, stock:Number **required** image:String **required**| `{_id ,name , price , description, quantity }` | 422 (validation error), 500 (internal server error)| add product data into database
`/products` | GET | token | none | `[{_id ,name , price , quantity }]` | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | get list of products
`/products` | PATCH | token | name:String , price:String , description: String, quantity:Integer  | - | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | edit a product base on its id
`/products` | DELETE | token | - | - | 404 (Not found), 401 (Unauthorized user), 500 (internal server error)  | delete a product base on its id

# User Docs
Routes| Method | Headers | Request Body | Response Data| Response Error | Description 
------|--------|---------|--------------|--------------|----------------|-------------
`/users/register` | POST | - | firstName:String , lastName:String, email:String, password:String | `{_id ,firstName , lastName , email, password }` | 422 (validation error), 500 (internal server error)| register user
`/users/login` | POST | - | email:String, password:String | `{access_tokeb , user }` | 422 (validation error), 500 (internal server error)| login user

# Cart Docs
Routes| Method | Headers | Request Body | Response Data| Response Error | Description 
------|--------|---------|--------------|--------------|----------------|-------------
`/carts/:userId` | GET | access_token | - | `[{_id, produtId, userId, quantity}]` | 422 (validation error), 500 (internal server error)| get cart based on user
`/carts` | POST | access_token | productId:ObjectId, userId:userId, quantity:Number | `[{_id, produtId, userId, quantity}]` | 422 (validation error), 500 (internal server error)| create new cart
`/carts/:userId` | PATCH | access_token | productId:ObjectId, userId:userId, quantity:Number | - | 422 (validation error), 500 (internal server error)| update an item in cart
`/carts/:userId` | DELETE | access_token | - | - | 422 (validation error), 500 (internal server error)| delete an item in cart
