import { makeExecutableSchema } from "@graphql-tools/schema"
import { buildSchema } from "graphql"
import { resolvers } from "./urql.ts"
import { gql } from "urql"

const schema = buildSchema(`
  type User {
    id: String!
    name: String!
    age: Int!
  }

  type Car {
    id: Int!
    name: String!
    colors: [String!]!
  }

  type Bicycle {
    id: Int!
    name: String!
  }

  type Vehicle {
    car(id: Int!): Car
    cars: [Car!]!
    bicycle(id: Int!): Bicycle
    bicycles: [Bicycle!]!
    speed: String!
  }

  type Query {
    user: User
    vehicle: Vehicle
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

export const VehicleSpeedDocument = gql`
  query {
    vehicle {
      speed
    }
  }
`

export const CarColorsDocument = gql`
  query ($id: Int!) {
    vehicle {
      car(id: $id) {
        id
        colors
      }
    }
  }
`

export const CarNameDocument = gql`
  query ($id: Int!) {
    vehicle {
      car(id: $id) {
        id
        name
      }
    }
  }
`

export const CarsDocument = gql`
  query {
    vehicle {
      cars {
        id
        name
        colors
      }
    }
  }
`

export const BicycleNameDocument = gql`
  query ($id: Int!) {
    vehicle {
      bicycle(id: $id) {
        id
        name
      }
    }
  }
`

export const BicyclesDocument = gql`
  query {
    vehicle {
      bicycles {
        id
        name
      }
    }
  }
`

export const GetAllVehiclesDocument = gql`
  query ($carId: Int!, $bicycleId: Int!){
    vehicle {
      speed
      car(id: $carId) {
        id
        name
        colors
      }
      bicycle(id: $bicycleId) {
        id
        name
      }
    }
  }
`
