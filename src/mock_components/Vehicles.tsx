import React from "react"
import { CarsDocument, BicyclesDocument } from "../__mocked_generated__/graphql"
import { useQuery } from "urql"

export const Vehicles = () => {
	const [{ data: bicycles, fetching: fetchingBicycles }] = useQuery({
		query: BicyclesDocument,
	})

	const [{ data: cars, fetching: fetchingCars }] = useQuery({
		query: CarsDocument,
	})

	if (fetchingBicycles || fetchingCars) {
		return null
	}

	return (
		<>
			<pre>Vehicles</pre>
			<pre>{JSON.stringify(bicycles, null, 2)}</pre>
			<pre>{JSON.stringify(cars, null, 2)}</pre>
		</>
	)
}
