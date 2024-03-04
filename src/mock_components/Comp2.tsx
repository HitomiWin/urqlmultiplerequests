import React, { useEffect, useState } from "react"
import { useQuery } from "urql"
import { ModelQuery } from "../__mocked_generated__/graphql"

const Comp2 = () => {
	const [someState1, setSomeState1] = useState<boolean | null>(null)
	const [{ data, fetching }] = useQuery({
		query: ModelQuery,
		pause: someState1 ?? false,
	})

	// Update state 1
	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setSomeState1(false)
		}, 200)

		return () => window.clearTimeout(timeout)
	}, [])

	// Update state 1
	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setSomeState1(true)
		}, 400)

		return () => window.clearTimeout(timeout)
	}, [])

	if (fetching) {
		return null
	}

	return <div>{data.cars.model.name}</div>
}

export default Comp2
