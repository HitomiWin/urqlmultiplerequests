import React, { FC } from "react"
import { GetAllVehiclesDocument } from "../__mocked_generated__/graphql"
import { useQuery } from "urql"

interface CarAndBicyleProps {
	readonly carId: number
	readonly bicycleId: number
}

export const CarAndBicycle: FC<CarAndBicyleProps> = ({ carId, bicycleId }) => {
	const [{ data, fetching }] = useQuery({
		query: GetAllVehiclesDocument,
		variables: {
			carId,
			bicycleId,
		},
	})

	if (fetching) {
		return null
	}

	return (
		<>
			<pre>Car and bicycle</pre>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</>
	)
}
