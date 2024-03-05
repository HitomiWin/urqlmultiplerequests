import React, { FC, useEffect, useState } from "react"
import { Vehicles } from "./Vehicles"
import { CarAndBicycle } from "./CarAndBicyle"
import {
	BicycleNameDocument,
	CarColorsDocument,
	CarNameDocument,
	VehicleSpeedDocument,
} from "../__mocked_generated__/graphql"
import { useQuery } from "urql"

const Comp1: FC = () => {
	const [carId, setCarId] = useState<number>()
	const [bicycleId, setBicycleId] = useState<number>()

	const [{ data: bicycleName, fetching: fetchingBicycleName }] = useQuery({
		query: BicycleNameDocument,
		variables: {
			id: bicycleId,
		},
	})

	const [{ data: carColors, fetching: fetchingCarColors }] = useQuery({
		query: CarColorsDocument,
		variables: {
			id: carId,
		},
	})

	const [{ data: carName, fetching: fetchingCarName }] = useQuery({
		query: CarNameDocument,
		variables: {
			id: carId,
		},
	})

	const [{ data: vehicleSpeed, fetching: fetchingVehicleSpeed }] = useQuery({
		query: VehicleSpeedDocument,
	})

	// Update carId
	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setBicycleId(1)
		}, 200)

		return () => window.clearTimeout(timeout)
	}, [])

	// Update bicycleId
	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setCarId(1)
		}, 200)

		return () => window.clearTimeout(timeout)
	}, [])

	if (
		fetchingCarColors ||
		fetchingCarName ||
		fetchingVehicleSpeed ||
		fetchingBicycleName
	) {
		return null
	}

	return (
		<>
			<pre>{JSON.stringify({ carColors, carName, vehicleSpeed }, null, 2)}</pre>
			<pre>{JSON.stringify(bicycleName, null, 2)}</pre>
			<Vehicles />
			<CarAndBicycle carId={carId ?? 1} bicycleId={bicycleId ?? 1} />
		</>
	)
}

export default Comp1
