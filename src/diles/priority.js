var Diles;
(function (Diles) {
    (function (MessagePriority) {
        MessagePriority[MessagePriority["Mandatory"] = 0] = "Mandatory";
        MessagePriority[MessagePriority["High"] = 1] = "High";
        MessagePriority[MessagePriority["Medium"] = 2] = "Medium";
        MessagePriority[MessagePriority["Low"] = 3] = "Low";
        MessagePriority[MessagePriority["VeryLow"] = 4] = "VeryLow";
    })(Diles.MessagePriority || (Diles.MessagePriority = {}));
    var MessagePriority = Diles.MessagePriority;
})(Diles || (Diles = {}));
//# sourceMappingURL=priority.js.map