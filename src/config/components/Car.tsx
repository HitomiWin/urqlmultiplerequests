import React from "react"
import { CarNameDocument } from "../../__mocked_generated__/graphql"
import { useQuery } from "urql"

export const Car = ({id}: {id: string}) => {
	// Run query to fetch bicycles
	const [{ data, fetching }] = useQuery({
		query: CarNameDocument,
		variables: {
			id
		}
	})

	if (fetching) {
		return null
	}

	return (
		<>
			<pre>Car id: {id}</pre>
			<pre>Car name: {data.vehicle.car.name}</pre>
		</>
	)
}
