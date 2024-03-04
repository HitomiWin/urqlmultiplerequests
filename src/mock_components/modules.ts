const delayForDemo = (promise) => {
	return new Promise((resolve) => {
		setTimeout(resolve, 2000)
	}).then(() => promise)
}

// const Comp1 = lazy(() => delayForDemo(import('./Comp1')));
// const Comp2 = lazy(() => delayForDemo(import('./Comp2')));
// const Comp3 = lazy(() => delayForDemo(import('./Comp3')));
// const Comp4 = lazy(() => delayForDemo(import('./Comp4')));
// const Comp5 = lazy(() => delayForDemo(import('./Comp5')));

const Comp1 = () => delayForDemo(import("./Comp1"))
const Comp2 = () => delayForDemo(import("./Comp2"))
const Comp3 = () => delayForDemo(import("./Comp3"))
const Comp4 = () => delayForDemo(import("./Comp4"))
const Comp5 = () => delayForDemo(import("./Comp5"))

let routeNumber = 0
const getRoute = () => {
	return `route${++routeNumber}`
}
let isDefaultModuleSet = false
const modules = [Comp1, Comp2, Comp3, Comp4, Comp5].map((component) => {
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
