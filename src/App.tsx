import React, { FC, Suspense, lazy, useEffect, useState } from "react"
import { UserQuery, userMutation } from "./__mocked_generated__/graphql"
import { useClient, useQuery } from "urql"
import { getModules, getRedirect } from "./mock_components/modules"
import { Navigate, Route, Routes, useNavigate } from "react-router-dom"

export const App: FC = () => {
	const navigate = useNavigate()
	const client = useClient()

	// This prepare function calls an urql mutation before suspense
	// is ready.
	const prepare = async () => {
		await client.mutation(userMutation, {}).toPromise()
		console.log("Mutation complete")
	}

	useEffect(() => {
		prepare().catch(console.trace)
	}, [])

	const modules = getModules()

	return (
		<Suspense fallback={<div>...Loading</div>}>
			<button onClick={() => navigate("route1")}>Component 1</button>
			<button onClick={() => navigate("route2")}>Component 2</button>
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
