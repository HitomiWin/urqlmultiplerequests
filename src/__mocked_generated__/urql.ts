import { sleep } from "../sleep"

const getNumberOfCars = async (): Promise<number> => {
	await sleep(20)
	return 4
}

const getNumberOfBicycles = async (): Promise<number> => {
	await sleep(20)
	return 4
}

let number = 25
const generateNumber = () => {
	return ++number
}
export const resolvers = {
	Query: {
		user: async () => {
			console.count("User query")
			await sleep(250)
			return {
				id: "user",
				name: "username",
				age: 25,
			}
		},
		vehicle: async () => {
			console.count("Query:vehicle")
			await sleep(50)
			return {}
		},
	},

	Vehicle: {
		car: async (_parent: never, args: { readonly id: number }) => {
			console.count("Vehicle:car")
			const count = await getNumberOfCars()
			if (args.id >= 0 && args.id < count) {
				return {
					id: args.id,
				}
			}
		},
		cars: async () => {
			console.count("Vehicle:cars")
			const count = await getNumberOfCars()
			return [...Array(count).keys()].map((id) => ({ id }))
		},
		bicycle: async (_parent: never, args: { readonly id: number }) => {
			console.count("Vehicle:bicycle")
			const count = await getNumberOfBicycles()
			if (args.id >= 0 && args.id < count) {
				return { id: args.id }
			}
		},
		bicycles: async () => {
			console.count("Vehicle:bicycles")
			const count = await getNumberOfBicycles()
			return [...Array(count).keys()].map((id) => ({ id }))
		},
		speed: async (): Promise<string> => {
			console.count("Vehicle:speed")
			await sleep(80)

			return "90km/h"
		},
	},

	Car: {
		name: async (parent): Promise<string> => {
			console.count("Car:name")
			await sleep(40)

			return `Car_${parent.id}`
		},
		colors: async (): Promise<ReadonlyArray<string>> => {
			console.count("Car:colors")
			await sleep(110)

			return ["red", "blue", "green"]
		},
	},

	Bicycle: {
		name: async (parent) => {
			console.count("Bicycle:name")
			await sleep(20)
			return `Bicycle_${parent.id}`
		},
	},

	Mutation: {
		editUser: async () => {
			await sleep(50)
			console.log("mutation")
			return {
				id: "user",
				name: "Some name",
				age: generateNumber(),
			}
		},
	},
}

export const optimistic = {
	editUser: (vars) => {
		return {
			id: "user",
			__typename: "User",
			name: "Some name",
			age: number + 1,
		}
	},
}
