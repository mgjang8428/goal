export interface Logger {
    log(...args: any[]): void
    trace(...args: any[]): void
    info(...args: any[]): void
    debug(...args: any[]): void
    warn(...args: any[]): void
    error(...args: any[]): void
}

export default class logger implements Logger {

    /**
     * Vite DEV 여부에 따른 로깅 모드 설정
     */
    private isDevMode: boolean = import.meta.env.DEV

    /**
     * 날짜 로깅
     * @returns 날짜로깅포멧 string
     */
    private get dateFormat(): string {
        const timestamp = new Date().getTime()
        const date = new Date(timestamp)

        /* 생성한 Date 객체에서 년, 월, 일, 시, 분을 각각 문자열 곧바로 추출 */
        var year = date.getFullYear().toString().slice(-2) //년도 뒤에 두자리
        var month = ("0" + (date.getMonth() + 1)).slice(-2) //월 2자리 (01, 02 ... 12)
        var day = ("0" + date.getDate()).slice(-2) //일 2자리 (01, 02 ... 31)
        var hour = ("0" + date.getHours()).slice(-2) //시 2자리 (00, 01 ... 23)
        var minute = ("0" + date.getMinutes()).slice(-2) //분 2자리 (00, 01 ... 59)
        var second = ("0" + date.getSeconds()).slice(-2) //초 2자리 (00, 01 ... 59)

        return `[${year}-${month}-${day} ${hour}:${minute}:${second}]`
    }

    public get log() {
        if (!this.isDevMode) return () => {}
        return console.log.bind(console, this.dateFormat)
    }
    public get trace() {
        if (!this.isDevMode) return () => {}
        return console.trace.bind(console, this.dateFormat)
    }
    public get debug() {
        if (!this.isDevMode) return () => {}
        return console.debug.bind(console, this.dateFormat)
    }
    public get info() {
        if (!this.isDevMode) return () => {}
        return console.info.bind(console, this.dateFormat)
    }
    public get warn() {
        if (!this.isDevMode) return () => {}
        return console.warn.bind(console, this.dateFormat)
    }
    public get error() {
        if (!this.isDevMode) return () => {}
        return console.error.bind(console, this.dateFormat)
    }
}