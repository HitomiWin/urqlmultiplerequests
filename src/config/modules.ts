const delayForDemo = (promise) => {
	return new Promise((resolve) => {
		setTimeout(resolve, 2000)
	}).then(() => promise)
}

const Vehicles = () => delayForDemo(import("./Vehicles"))

let routeNumber = 0
const getRoute = () => {
	return `route${++routeNumber}`
}
let isDefaultModuleSet = false
const modules = [Vehicles].map((component) => {
	let defaultModule = false
	if (!isDefaultModuleSet) {
		isDefaultModuleSet = true
		defaultModule = true
	}
	return {
		component,
		route: getRoute(),
		defaultModule,
	}
})

export const getModules = () => modules

export const getRedirect = () => {
	const modules = getModules()
	const defaultModule = modules.find((module) => module.defaultModule)
	if (defaultModule !== undefined) {
		return defaultModule.route
	}
	return "/"
}
