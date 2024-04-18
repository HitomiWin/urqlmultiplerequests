import { devtoolsExchange } from "@urql/devtools"
import { executeExchange } from "@urql/exchange-execute"
import { cacheExchange } from "@urql/exchange-graphcache"
import { Client } from "urql"
import { optimistic } from "./__mocked_generated__/urql"
import { executableSchema } from "./__mocked_generated__/graphql"

export const initUrql = () => {
	const client = new Client({
		url: "/graphql",
		exchanges: [
			devtoolsExchange,
			cacheExchange({
				optimistic,
				keys: {
					Cars: () => null,
					Vehicle: () => null
				},
			}),
			executeExchange({ schema: executableSchema, context: () => ({}) }),
		],
		suspense: true
	})

	return client
}
