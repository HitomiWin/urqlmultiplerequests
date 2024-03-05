import { devtoolsExchange } from "@urql/devtools"
import { executeExchange } from "@urql/exchange-execute"
import { cacheExchange } from "@urql/exchange-graphcache"
import { Client, dedupExchange } from "urql"
import { optimistic } from "./__mocked_generated__/urql"
import { executableSchema } from "./__mocked_generated__/graphql"

export const initUrql = () => {
	const client = new Client({
		url: "/graphql",
		maskTypename: true,
		exchanges: [
			devtoolsExchange,
			dedupExchange,
			cacheExchange({
				optimistic,
				keys: {
					Cars: () => null,
				},
			}),
			executeExchange({ schema: executableSchema, context: () => ({}) }),
		],
		suspense: true,
	})

	return client
}
