import React, { FC, ReactNode, useEffect, useState } from "react"
import { sleep } from "./sleep"
import { User } from "./User"

interface SystemReadyProps {
	readonly children: ReactNode
}

export const LoadingApp: FC<SystemReadyProps> = ({ children }) => {
	const [loading, setLoading] = useState(true)
	const [userSet, setIsUserSet] = useState(false)

	useEffect(() => {
		// We have to wait for an operation to be complete
		// Simulate this behaviour
		sleep(2000).then(() => setLoading(false))
	}, [])

	if (loading) {
		return <div>...System getting ready</div>
	}

	if (!userSet) {
		window.history.replaceState(null, "", window.location.href.split("#")[0])
		// Prompt user creation to access application
		return <User setIsUserSet={setIsUserSet} />
	}

	// User is set, open application
	return <>{children}</>
}
