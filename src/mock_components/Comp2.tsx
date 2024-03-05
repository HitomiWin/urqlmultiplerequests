import React, { useEffect, useState } from "react"
import { useQuery } from "urql"
import {
	CarsDocument,
	VehicleSpeedDocument,
} from "../__mocked_generated__/graphql"

const Comp2 = () => {
	const [{ data: vechicleSpeed, fetching }] = useQuery({
		query: VehicleSpeedDocument,
	})

	const [{ data: cars, fetching: fetchingCars }] =
		useQuery({
			query: CarsDocument,
		})

	if (fetching || fetchingCars) {
		return null
	}

	return (
		<>
			<div>Component 2</div>
			<pre>{JSON.stringify(cars, null, 2)}</pre>
			<pre>{JSON.stringify(vechicleSpeed, null, 2)}</pre>
		</>
	)
}

export default Comp2
