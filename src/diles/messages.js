var Diles;
(function (Diles) {
    (function (DilesMessages) {
        DilesMessages.authority = Authorities.diles;
        (function (Domains) {
            Domains[Domains["core"] = 0x00] = "core";
        })(DilesMessages.Domains || (DilesMessages.Domains = {}));
        var Domains = DilesMessages.Domains;

        (function (CoreLibraries) {
            CoreLibraries[CoreLibraries["core"] = 0x00] = "core";
        })(DilesMessages.CoreLibraries || (DilesMessages.CoreLibraries = {}));
        var CoreLibraries = DilesMessages.CoreLibraries;

        function CreateMessage(messagePrefix, severity) {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 2); _i++) {
                args[_i] = arguments[_i + 2];
            }
            return new Message();
        }
        DilesMessages.CreateMessage = CreateMessage;
    })(Diles.DilesMessages || (Diles.DilesMessages = {}));
    var DilesMessages = Diles.DilesMessages;
})(Diles || (Diles = {}));
