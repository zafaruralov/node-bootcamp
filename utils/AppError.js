class AppError extends Error {
    constructor(code, message) {
        super(message)
<<<<<<< HEAD
        this.satatusCode = code
    }
}

=======
        this.statusCode = code
    }
}
>>>>>>> 95695079f31b2638641622279f4b3a9f2bb65f72
module.exports = AppError
