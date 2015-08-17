module Diles {
    interface ICodePartData<T> {
        position: number;
        length: number;
        converter: { to: (partCode: number) => T, from: (part: T) => number };
    }

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

    export class MessageCode {
        public static schemaCode: number = 1;
        public static schemaVersion = 0;

        code: string;

        constructor(code: string) {
            // TODO: Validate schema and schemaVersion.
            this.code = code;
        }

        static create(
            authority: number,
            domain: number,
            library: number,
            severity: MessageSeverity,
            base: number,
            priority?: MessagePriority): MessageCode {

            // TODO: Add validator to part data and execute it.

            if (priority === undefined) {
                priority = MessageCode.getDefaultPriority(severity);
            }

            let schemaCode = MessageCode.formatCodePart(MessageCode.schemaCode, MessageCode.partData.schemaData);

            let schemaVersionCode = MessageCode.formatCodePart(
                MessageCode.schemaVersion, MessageCode.partData.schemaVersionData);

            let authorityCode = MessageCode.formatCodePart(authority, MessageCode.partData.authorityData);
            let domainCode = MessageCode.formatCodePart(domain, MessageCode.partData.domainData);
            let libraryCode = MessageCode.formatCodePart(library, MessageCode.partData.libraryData);
            let severityCode = MessageCode.formatCodePart(severity, MessageCode.partData.severityData);
            let baseCode = MessageCode.formatCodePart(base, MessageCode.partData.baseCodeData);


            let priorityCode = MessageCode.formatCodePart(priority, MessageCode.partData.priorityData);

            return new MessageCode(schemaCode.concat(schemaVersionCode, authorityCode, domainCode, libraryCode, severityCode, baseCode));
        }

        public static getDefaultPriority(severity: MessageSeverity): MessagePriority {
            return (severity <= MessageSeverity.Verbose)
                ? <MessagePriority><any>severity
                : MessagePriority.VeryLow
        }

        public get authority(): number {
            return MessageCode.getAuthority(this.code);
        }

        public get domain(): number {
            return MessageCode.getDomain(this.code);
        }

        public get library(): number {
            return MessageCode.getLibrary(this.code);
        }

        public get priority(): MessagePriority {
            return MessageCode.getPriority(this.code);
        }

        public get severity(): MessageSeverity {
            return MessageCode.getSeverity(this.code);
        }


        public static getAuthority(code: string): number {
            return MessageCode.parsePart(code, MessageCode.partData.authorityData);
        }

        public static getDomain(code: string): number {
            return MessageCode.parsePart(code, MessageCode.partData.domainData);
        }

        public static getLibrary(code: string): number {
            return MessageCode.parsePart(code, MessageCode.partData.libraryData);
        }

        public static getPriority(code: string): MessagePriority {
            return MessageCode.parsePart(code, MessageCode.partData.priorityData);
        }

        public static getSeverity(code: string): MessageSeverity {
            return MessageCode.parsePart(code, MessageCode.partData.severityData);
        }


        private static parsePart<T>(code: string, data: ICodePartData<T>): T {
            let partCode = parseInt(code.substr(data.position, data.length), 16);
            return data.converter.to(partCode);
        }

        private static dummyConverter = {
            from: (partIsPartCode: number) => partIsPartCode,
            to: (partCodeIsPart: number) => partCodeIsPart,
        }

        private static priorityConverter = {
            from: (priority: MessagePriority) => {
                // TODO: verify priority is  >=0 and < 16
                return <number>(15 - priority);
            },
            to: (priorityCode: number) => {
                // TODO: verify priorityCode is integer >=0 and < 16
                return <MessagePriority>(15 - priorityCode);
            },
        }

        private static severityConverter = {
            from: (severity: MessageSeverity) => {
                // TODO: verify severity is  >=0 and < 16
                return <number>(15 - severity);
            },
            to: (severityCode: number) => {
                // TODO: verify severityCode is integer >=0 and < 16
                return <MessageSeverity>(15 - severityCode);
            },
        }

        private static partData = {
            schemaData: <ICodePartData<number>>{
                position: 0, length: 1, converter: MessageCode.dummyConverter,
            },
            schemaVersionData: <ICodePartData<number>>{
                position: 1, length: 1, converter: MessageCode.dummyConverter,
            },
            authorityData: <ICodePartData<number>>{
                position: 2, length: 4, converter: MessageCode.dummyConverter,
            },
            domainData: <ICodePartData<number>>{
                position: 6, length: 2, converter: MessageCode.dummyConverter,
            },
            libraryData: <ICodePartData<number>>{
                position: 8, length: 2, converter: MessageCode.dummyConverter,
            },
            priorityData: <ICodePartData<MessagePriority>>{
                position: 10, length: 1, converter: MessageCode.priorityConverter,
            },
            severityData: <ICodePartData<MessageSeverity>>{
                position: 11, length: 1, converter: MessageCode.severityConverter,
            },
            baseCodeData: <ICodePartData<number>>{
                position: 12, length: 4, converter: MessageCode.dummyConverter,
            },
        }

        private static zpad(str: string, count: number) {
            let mask = ["dummy-value", "0", "00", "000", "0000"][count];

            return (mask + str).slice(0 - count);
        }

        private static formatCodePart<T>(part: T, data: ICodePartData<T>): string {
            return MessageCode.zpad(data.converter.from(part).toString(16), data.length);
        }
    }
}