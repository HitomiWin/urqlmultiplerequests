import { sleep } from "../sleep"

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
		cars: () => {
			return {}
		},
	},

	Cars: {
		car: async () => {
			console.count("car query")
			await sleep(200)
			return {
				id: "car",
				name: "Saab",
			}
		},
		model: async () => {
			console.count("Model query")
			await sleep(200)
			return {
				id: "car",
				name: "9-3",
			}
		},
		retail: async () => {
			console.count("Retail query")
			await sleep(50)
			return {
				id: "retail",
				name: "epic-cars",
			}
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
