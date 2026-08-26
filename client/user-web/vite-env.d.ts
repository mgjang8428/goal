interface ViteTypeOptions {
    // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_NETWORK_API_URL: string
    readonly VITE_NETWORK_API_TIMEOUT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}