import i18n from "i18next"
import { initReactI18next } from "react-i18next"

const isDevMode: boolean = import.meta.env.DEV

const modules = import.meta.glob("./**/*.json", {
	eager: true,
	import: "default"
}) as Record<string, Record<string, any>>

const resources: Record<string, Record<string, any>> = {}

for (const [path, json] of Object.entries(modules)) {
	const parts = path.replace(/^\.?\//, "").split("/")
	const lng = parts[0]
	const ns = parts[parts.length - 1].replace(/\.json$/, "")

	;(resources[lng] ??= {})[ns] = json as object
}

export const defaultNS = "default"

i18n.use(initReactI18next).init({
	lng: "ko",
	debug: isDevMode,
	resources,
	defaultNS
})

export default i18n
