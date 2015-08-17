var Diles;
(function (Diles) {
    var MessageError = (function () {
        function MessageError(messages) {
            this.messages = messages;
            var severity = Diles.MessageArray.getSeverity(messages);
            if (severity > Diles.MessageSeverity.Error) {
                throw new Error("The message array must have an error severity. Yours, '" + severity + "', is not.");
            }
        }
        Object.defineProperty(MessageError.prototype, "message", {
            get: function () {
                return Diles.MessageArray.getErrors(this.messages)[0].message;
            },
            enumerable: true,
            configurable: true
        });
        return MessageError;
    })();
    Diles.MessageError = MessageError;
})(Diles || (Diles = {}));
//# sourceMappingURL=messageerror.js.map