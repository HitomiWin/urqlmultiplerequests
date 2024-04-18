import React, { FC, Suspense, lazy, useEffect } from "react"
import { userMutation } from "./__mocked_generated__/graphql"
import { useClient } from "urql"
import { getModules, getRedirect } from "./config/modules"
import { Navigate, Route, Routes } from "react-router-dom"

export const App: FC = () => {
	const client = useClient()

	// This prepare function calls an urql mutation before suspense
	// is ready.
	const prepare = async () => {
		await client.mutation(userMutation, {}).toPromise()
		console.log("Mutation complete")
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: run only once
	useEffect(() => {
		prepare().catch(console.trace)
	}, [])

	const modules = getModules()

	return (
		<Suspense fallback={<div>...Loading</div>}>
			<Routes>
				{modules.map(({ component, route }) => {
					const LazyComponent = lazy(component)
					return <Route key={route} path={route} element={<LazyComponent />} />
				})}
				<Route
					path="*"
					element={<Navigate replace={true} to={getRedirect()} />}
				/>
			</Routes>
		</Suspense>
	)
}
