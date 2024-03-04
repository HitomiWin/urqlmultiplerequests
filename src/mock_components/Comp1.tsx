import React, { FC, useEffect, useState } from "react"
import { useData } from "../hooks/useData"
import { Comp1SubComponent } from "./Comp1SubComponent"

const Comp1: FC = () => {
	const [someState1, setSomeState1] = useState<boolean | null>(null)
	const [someState2, setSomeState2] = useState<boolean | undefined>(undefined)

	// Update state 1
	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setSomeState1(true)
		}, 200)

		return () => window.clearTimeout(timeout)
	}, [])

	// Update state 2
	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setSomeState2(true)
		}, 500)

		return () => window.clearTimeout(timeout)
	}, [])

	// Update state 3
	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setSomeState2(false)
		}, 600)

		return () => window.clearTimeout(timeout)
	}, [])

	// Update state 4
	useEffect(() => {
		const timeout = window.setTimeout(() => {
			setSomeState2(true)
		}, 700)

		return () => window.clearTimeout(timeout)
	}, [])

	const { data, loading } = useData(someState1 ?? false, someState2)

	if (loading) {
		return null
	}

	return (
		<>
			<div>{JSON.stringify(data, null, 2)}</div>
			<Comp1SubComponent />
		</>
	)
}

export default Comp1
