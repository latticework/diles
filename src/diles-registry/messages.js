var Diles;
(function (Diles) {
    Diles.authority = Diles.Authorities.diles;
    (function (MessageDomains) {
        MessageDomains[MessageDomains["core"] = 0] = "core";
    })(Diles.MessageDomains || (Diles.MessageDomains = {}));
    var MessageDomains = Diles.MessageDomains;
    (function (CoreLibraries) {
        CoreLibraries[CoreLibraries["core"] = 0] = "core";
    })(Diles.CoreLibraries || (Diles.CoreLibraries = {}));
    var CoreLibraries = Diles.CoreLibraries;
})(Diles || (Diles = {}));
//# sourceMappingURL=messages.js.map