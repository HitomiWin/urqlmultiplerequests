import React, { Dispatch, FC, SetStateAction, useCallback } from "react"
import { useQuery } from "urql"
import { UserQuery } from "./__mocked_generated__/graphql"

interface UserProps {
	readonly setIsUserSet: Dispatch<SetStateAction<boolean>>
}

export const User: FC<UserProps> = ({ setIsUserSet }) => {
	const [{ data, fetching }] = useQuery({
		query: UserQuery,
	})
	const setUser = useCallback(() => {
		setIsUserSet(true)
	}, [setIsUserSet])
	if (fetching) {
		return null
	}
	return <button onClick={setUser}>Set user {data.user.name}</button>
}
