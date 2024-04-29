import React from "react"
import { CarsDocument, BicyclesDocument, VehicleSpeedDocument } from "../__mocked_generated__/graphql"
import { useQuery } from "urql"
import { Car } from './components/Car'

const Vehicles = () => {
	// Run query to fetch bicycles
	const [{ data: bicycles, fetching: fetchingBicycles,}] = useQuery({
		query: BicyclesDocument,
	})

    const [{ data: speed, fetching: fetchingSpeed,}] = useQuery({
		query: VehicleSpeedDocument,
	})


	// Run query to fetch cars
	const [{ data: cars, fetching: fetchingCars }] = useQuery({
		query: CarsDocument,
	})

	if (fetchingCars || fetchingBicycles) {
		return null
	}

	return (
		<>
			<pre>Vehicles</pre>
			<pre>{JSON.stringify(bicycles, null, 2)}</pre>
			<pre>{JSON.stringify(cars, null, 2)}</pre>
      		{/* <pre>{JSON.stringify(speed, null, 2)}</pre> */}
		<Car />
		</>
	)
}

export default Vehicles
