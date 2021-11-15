# GRAPHQL-BACKEND


`OBTENER TODOS LOS PRODUCTOS`

QUERY
```gql
query{
  getProducts{
    name
    slug
    status
  }
}
```
___
`OBTENER UN PRODUCTO`
QUERY
```gql
query{
  getProduct(slug:"guitarra-5tvbja"){
    name
    slug
    status
  }
}
```

Header 
```
Authorization  Token "codigoToken"
```
___
`CREAR UN PRODUCTO`

QUERY
```gql
mutation addProduct($input: newProductInput) {
  addProduct(product: $input) {
    name
    slug
    price
    
  }
}
```
GRAPHQL VARIABLES

```
{
  "input": {
    "name": "KevinGraph21",
    "id_category":0,
   "price": 5,
    "location":"Ontinyent"
  }
}
```
Header 
```
Authorization  Token "codigoToken"
```
___
`MODIFICAR UN PRODUCTO`

QUERY
```gql
mutation updateProduct($input: updateProductInput) {
  updateProduct(product: $input) {
    name
    slug
    price
    author
id_category
    description
  }
}
```
GRAPHQL VARIABLES

```
{
  "input": {
    "slug": "kevingraph21-rrrz03",
        "id_category":6,
        "name": "japo",
    "location":"Valencia"
    
  }
}
```
Header 
```
Authorization  Token "codigoToken"
```
`ELIMINAR UN PRODUCTO`

QUERY
```gql
mutation{
  deleteProduct(slug:"kevingraph21-w0ldmg")
}
```

Header 
```
Authorization  Token "codigoToken"
```
