class UserNotificationError extends Error {
    constructor(message, errorCode, errorData) {
        super(message);
        this.errorCode = errorCode;
    }
}

export { UserNotificationError };