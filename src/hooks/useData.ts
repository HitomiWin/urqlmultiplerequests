import { useMemo } from "react"
import { gql, useQuery } from "urql"
import { useData2 } from "./useData2"

const CarQuery = gql`
  query {
    cars {
        car {
            id
            name
        }
    }    
  }
`

const ModelQuery = gql`
  query {
    cars {
        model {
            id
            name
        }
    }    
  }
`

export const useData = (
	someThingPausing1: boolean,
	someThingPausing2?: boolean,
) => {
	const [{ data: modelData, fetching: fetchingModelData }] = useQuery({
		query: ModelQuery,
		pause: someThingPausing1,
	})

	const [{ data, fetching }] = useQuery({
		query: CarQuery,
		pause: someThingPausing1 || someThingPausing2,
	})

	const { data: retailData, fetching: fetchingRetail } = useData2()

	const loading = fetching || fetchingModelData || fetchingRetail

	return useMemo(() => {
		return {
			data: {
				modelData,
				data,
				retailData,
			},
			loading,
		}
	}, [loading, data, modelData, someThingPausing1, someThingPausing2])
}
