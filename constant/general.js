module.exports = {
    apiError: function(message ="Terjadi kesalahan pada server, silakan coba beberapa saat lagi", httpCode =500) {
        return {
            "result" : "failed",
            "code" : httpCode,
            "message" : message,
            "data" : {}
        }
    }
}