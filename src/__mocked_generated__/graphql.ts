import { makeExecutableSchema } from "@graphql-tools/schema"
import { buildSchema } from "graphql"
import { resolvers } from "./urql.ts"
import { gql } from "urql"

const schema = buildSchema(`
  type Car {
    id: String!
    name: String!
  }

  type Retail {
    id: String!
    name: String!
  }

  type Model {
    id: String!
    name: String!
  }

  type User {
    id: String!
    name: String!
    age: String!
  }

  type Query {
    user: User
    cars: Cars
  }

  type Cars {
    car: Car
    model: Model
    retail: Retail
  }

  type Mutation {
    editUser: User
  }
`)

export const executableSchema = makeExecutableSchema({
	typeDefs: schema,
	resolvers,
})

export const userMutation = gql`
  mutation editUser {
    editUser {
        id
        name
        age
    }
  }
`

export const UserQuery = gql`
  query {
    user {
        id
        name
        age
    }
  }
`

export const ModelQuery = gql`
query {
  cars {
      model {
          id
          name
      }
  }    
}
`
