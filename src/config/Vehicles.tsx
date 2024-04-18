import React from "react"
import { CarsDocument, BicyclesDocument } from "../__mocked_generated__/graphql"
import { useQuery } from "urql"
import { Car } from './components/Car'

const Vehicles = () => {
	// Run query to fetch bicycles
	const [{ data: bicycles, fetching: fetchingBicycles }] = useQuery({
		query: BicyclesDocument,
	})

	// Run query to fetch cars
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
			{cars.vehicle.cars.map(car => {
				return <Car id={car.id}/>
			})}
		</>
	)
}

export default Vehicles
