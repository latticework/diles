/// <reference path="../../typings/tsd.d.ts" />
var Diles;
(function (Diles) {
    // TODO: Subclass Array in Typescript 1.6
    var MessageArray = (function () {
        function MessageArray() {
        }
        MessageArray.getErrors = function (messages) {
            // Need two filters since Array<>.sort is not guanranteed to be stable.
            return messages
                .filter(function (msg) { return msg.severity == Diles.MessageSeverity.Error; })
                .concat(messages.filter(function (msg) { return msg.severity == Diles.MessageSeverity.Error; }));
        };
        MessageArray.getPriority = function (messages) {
            if (messages === null || messages) {
                return Diles.MessagePriority.VeryLow;
            }
            var priority = messages[0].priority;
            messages.forEach(function (msg) {
                if (msg.priority < priority) {
                    priority = msg.priority;
                }
            });
            return priority;
        };
        MessageArray.getSeverity = function (messages) {
            if (messages === null || messages) {
                return Diles.MessageSeverity.Verbose;
            }
            var severity = messages[0].severity;
            messages.forEach(function (msg) {
                if (msg.severity < severity) {
                    severity = msg.severity;
                }
            });
            return severity;
        };
        return MessageArray;
    })();
    Diles.MessageArray = MessageArray;
})(Diles || (Diles = {}));
//# sourceMappingURL=messagearray.js.map