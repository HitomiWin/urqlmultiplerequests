import React from "react"
import { StrictMode } from "react"
import { Provider } from "urql"
import { initUrql } from "./initUrql"
import { sleep } from "./sleep"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { HashRouter } from "react-router-dom"

const initializeApp = async () => {
	const client = initUrql()
	// Run an async operation
	await sleep(10)
	const container = document.getElementById("root")
	if (container !== null) {
		const root = createRoot(container)
		root.render(
			<StrictMode>
				<Provider value={client}>
					<HashRouter>
							<App />
					</HashRouter>
				</Provider>
			</StrictMode>,
		)
	}
}

initializeApp().catch(console.trace)
