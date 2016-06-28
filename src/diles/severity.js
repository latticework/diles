var Diles;
(function (Diles) {
    (function (MessageSeverity) {
        MessageSeverity[MessageSeverity["Critical"] = 0] = "Critical";
        MessageSeverity[MessageSeverity["Error"] = 1] = "Error";
        MessageSeverity[MessageSeverity["Warning"] = 2] = "Warning";
        MessageSeverity[MessageSeverity["Information"] = 3] = "Information";
        MessageSeverity[MessageSeverity["Verbose"] = 4] = "Verbose";
    })(Diles.MessageSeverity || (Diles.MessageSeverity = {}));
    var MessageSeverity = Diles.MessageSeverity;
})(Diles || (Diles = {}));
//# sourceMappingURL=severity.js.map