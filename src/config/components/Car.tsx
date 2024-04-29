import React, { Fragment } from "react"
import { CarsDocument } from "../../__mocked_generated__/graphql"
import { useQuery } from "urql"

export const Car = () => {
	// Run query to fetch bicycles
	const [{ data }] = useQuery({
		query: CarsDocument,
	})

	if (!data) {
		return null
	}

	return (
		<>

			{data.vehicle.cars.map(car => {
				return <Fragment key={car.id}>
				  <pre>Car id: {car.id}</pre>
				  <pre>Car name: {car.name}</pre>
				</Fragment>
			})}
		</>
	)
}
