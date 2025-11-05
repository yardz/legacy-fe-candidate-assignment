// Environment variables configuration
export const env = {
	apiUrl: import.meta.env.VITE_API_URL || "http://localhost:3000",
	dynamicEnvironmentId: import.meta.env.VITE_DYNAMIC_XYZ_ENV_ID,
	isDev: import.meta.env.DEV,
	isProd: import.meta.env.PROD,
	mode: import.meta.env.MODE,
} as const;

