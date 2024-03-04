import { useMemo } from "react"
import { gql, useQuery } from "urql"

const RetailQuery = gql`
  query {
    cars {
        retail {
            id
        name
        }
    }
  }
`

export const useData2 = () => {
	const [{ data, fetching }] = useQuery({
		query: RetailQuery,
	})

	return useMemo(() => {
		return {
			data,
			fetching,
		}
	}, [data, fetching])
}
