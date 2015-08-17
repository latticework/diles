/// <reference path="./priority.ts" />
/// <reference path="./severity.ts" />
/// <reference path="./imessage.ts" />
var Diles;
(function (Diles) {
    var Message = (function () {
        /***
         *
         */
        function Message(code, objectId, memberNames, messageTemplate) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            if (code === null) {
            }
            if (code.length != Message.codeLength) {
            }
            // TODO: Add parameter checks including arg types.
            this.code = code;
            this.messageTemplate = messageTemplate;
            this.args = args;
        }
        Object.defineProperty(Message.prototype, "message", {
            get: function () {
                return this.messageTemplate(this.args);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "priority", {
            get: function () {
                return Diles.MessageCode.getPriority(this.code);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Message.prototype, "severity", {
            get: function () {
                return Diles.MessageCode.getSeverity(this.code);
            },
            enumerable: true,
            configurable: true
        });
        Message.getCodePartCode = function (code, codePartData) {
            return code.substr(codePartData[0], codePartData[1]);
        };
        Message.getCodePartValue = function (codePartCode) {
            return parseInt(codePartCode, 16);
        };
        Message.getCodePartValueFromCode = function (code, codePartData) {
            return Message.getCodePartValue(Message.getCodePartCode(code, codePartData));
        };
        //             1
        // 0123 4567 8901 2345
        // CVAA AADD LLPS BBBB
        // |||    |  | || |
        // |||    |  | || +--- 0000 - FFFF Base Code
        // |||    |  | |+-----    0 -    F Severity
        // |||    |  | +------    0 -    F Priority
        // |||    |  +--------   00 -   FF Library
        // |||    +-----------   00 -   FF Domain
        // ||+---------------- 0000 - FFFF Authority (Registered)
        // |+-----------------    0      F Schema Version
        // +------------------    1        Schema
        Message.codeLength = 16;
        Message.codeSchemaData = [0, 1];
        Message.codeSchemaVersionData = [1, 1];
        Message.codeAuthorityData = [2, 4];
        Message.codeDomainData = [6, 2];
        Message.codeLibraryData = [8, 2];
        Message.codePriorityData = [10, 1];
        Message.codeSeverityData = [11, 1];
        Message.codeBaseCodeData = [12, 4];
        return Message;
    })();
    Diles.Message = Message;
})(Diles || (Diles = {}));
//# sourceMappingURL=message.js.map