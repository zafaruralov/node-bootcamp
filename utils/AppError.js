class AppError extends Error {
    constructor(code, message) {
        super(message)
        this.satatusCode = code
    }
}

module.exports = AppError
