var Diles;
(function (Diles) {
    //             1
    // 0123 4567 8901 2345
    // |||    |  | || |
    // CVAA AADD LLPS BBBB 
    // |||    |  | || |    Pos From   To   Part Name
    // |||    |  | || |    --- ----   ---- ----------------------
    // |||    |  | || +--- 12  0000 - FFFF Base Code
    // |||    |  | |+----- 11     0 -    F Severity
    // |||    |  | +------ 10     0 -    F Priority
    // |||    |  +--------  8    00 -   FF Library
    // |||    +-----------  6    00 -   FF Domain
    // ||+----------------  2  0000 - FFFF Authority (Registered)
    // |+-----------------  1     0      F Schema Version
    // +------------------  0     1        Schema
    var MessageCode = (function () {
        function MessageCode(code) {
            // TODO: Validate schema and schemaVersion.
            this.code = code;
        }
        MessageCode.create = function (authority, domain, library, severity, base, priority) {
            // TODO: Add validator to part data and execute it.
            if (priority === undefined) {
                priority = MessageCode.getDefaultPriority(severity);
            }
            var schemaCode = MessageCode.formatCodePart(MessageCode.schemaCode, MessageCode.partData.schemaData);
            var schemaVersionCode = MessageCode.formatCodePart(MessageCode.schemaVersion, MessageCode.partData.schemaVersionData);
            var authorityCode = MessageCode.formatCodePart(authority, MessageCode.partData.authorityData);
            var domainCode = MessageCode.formatCodePart(domain, MessageCode.partData.domainData);
            var libraryCode = MessageCode.formatCodePart(library, MessageCode.partData.libraryData);
            var severityCode = MessageCode.formatCodePart(severity, MessageCode.partData.severityData);
            var baseCode = MessageCode.formatCodePart(base, MessageCode.partData.baseCodeData);
            var priorityCode = MessageCode.formatCodePart(priority, MessageCode.partData.priorityData);
            return new MessageCode(schemaCode.concat(schemaVersionCode, authorityCode, domainCode, libraryCode, severityCode, baseCode));
        };
        MessageCode.getDefaultPriority = function (severity) {
            return (severity <= Diles.MessageSeverity.Verbose)
                ? severity
                : Diles.MessagePriority.VeryLow;
        };
        Object.defineProperty(MessageCode.prototype, "authority", {
            get: function () {
                return MessageCode.getAuthority(this.code);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MessageCode.prototype, "domain", {
            get: function () {
                return MessageCode.getDomain(this.code);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MessageCode.prototype, "library", {
            get: function () {
                return MessageCode.getLibrary(this.code);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MessageCode.prototype, "priority", {
            get: function () {
                return MessageCode.getPriority(this.code);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MessageCode.prototype, "severity", {
            get: function () {
                return MessageCode.getSeverity(this.code);
            },
            enumerable: true,
            configurable: true
        });
        MessageCode.getAuthority = function (code) {
            return MessageCode.parsePart(code, MessageCode.partData.authorityData);
        };
        MessageCode.getDomain = function (code) {
            return MessageCode.parsePart(code, MessageCode.partData.domainData);
        };
        MessageCode.getLibrary = function (code) {
            return MessageCode.parsePart(code, MessageCode.partData.libraryData);
        };
        MessageCode.getPriority = function (code) {
            return MessageCode.parsePart(code, MessageCode.partData.priorityData);
        };
        MessageCode.getSeverity = function (code) {
            return MessageCode.parsePart(code, MessageCode.partData.severityData);
        };
        MessageCode.parsePart = function (code, data) {
            var partCode = parseInt(code.substr(data.position, data.length), 16);
            return data.converter.to(partCode);
        };
        MessageCode.zpad = function (str, count) {
            var mask = ["dummy-value", "0", "00", "000", "0000"][count];
            return (mask + str).slice(0 - count);
        };
        MessageCode.formatCodePart = function (part, data) {
            return MessageCode.zpad(data.converter.from(part).toString(16), data.length);
        };
        MessageCode.schemaCode = 1;
        MessageCode.schemaVersion = 0;
        MessageCode.dummyConverter = {
            from: function (partIsPartCode) { return partIsPartCode; },
            to: function (partCodeIsPart) { return partCodeIsPart; },
        };
        MessageCode.priorityConverter = {
            from: function (priority) {
                // TODO: verify priority is  >=0 and < 16
                return (15 - priority);
            },
            to: function (priorityCode) {
                // TODO: verify priorityCode is integer >=0 and < 16
                return (15 - priorityCode);
            },
        };
        MessageCode.severityConverter = {
            from: function (severity) {
                // TODO: verify severity is  >=0 and < 16
                return (15 - severity);
            },
            to: function (severityCode) {
                // TODO: verify severityCode is integer >=0 and < 16
                return (15 - severityCode);
            },
        };
        MessageCode.partData = {
            schemaData: {
                position: 0, length: 1, converter: MessageCode.dummyConverter,
            },
            schemaVersionData: {
                position: 1, length: 1, converter: MessageCode.dummyConverter,
            },
            authorityData: {
                position: 2, length: 4, converter: MessageCode.dummyConverter,
            },
            domainData: {
                position: 6, length: 2, converter: MessageCode.dummyConverter,
            },
            libraryData: {
                position: 8, length: 2, converter: MessageCode.dummyConverter,
            },
            priorityData: {
                position: 10, length: 1, converter: MessageCode.priorityConverter,
            },
            severityData: {
                position: 11, length: 1, converter: MessageCode.severityConverter,
            },
            baseCodeData: {
                position: 12, length: 4, converter: MessageCode.dummyConverter,
            },
        };
        return MessageCode;
    })();
    Diles.MessageCode = MessageCode;
})(Diles || (Diles = {}));
//# sourceMappingURL=messagecode.js.map