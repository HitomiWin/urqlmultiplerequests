// Mock async operations
export const sleep = (millis: number) =>
	new Promise((resolve) => {
		window.setTimeout(() => {
			resolve(true)
		}, millis)
	})
