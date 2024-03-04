import React from "react"
import { useData2 } from "../hooks/useData2"

export const Comp1SubComponent = () => {
	const { data, fetching } = useData2()

	if (fetching) {
		return null
	}

	return <div>{JSON.stringify(data, null, 2)}</div>
}
