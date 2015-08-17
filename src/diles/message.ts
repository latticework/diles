/// <reference path="./priority.ts" />
/// <reference path="./severity.ts" />
/// <reference path="./imessage.ts" />
/// <reference path="./messagecode.ts" />

module Diles {
    export class Message implements IMessage {
        code: string;
        objectKey: string;
        propertyNames: string[];
        args: any[];
		
        /***
         *
         */
        constructor(
            code: string,
            objectId: string,
            memberNames: string[],
            messageTemplate: (args: any[]) => string,
            ...args: any[]) {
            if (code === null) {
                // TODO: throw missing parameter Error.
            }
            if (code.length != Message.codeLength) {
            }

            // TODO: Add parameter checks including arg types.
            this.code = code;
            this.messageTemplate = messageTemplate;
            this.args = args;
        }
		
		get message(): string {
			return this.messageTemplate(this.args);			
        }

        get priority(): MessagePriority {
            return MessageCode.getPriority(this.code);
        }

        get severity(): MessageSeverity {
            return MessageCode.getSeverity(this.code);
        }

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
        private static codeLength: number = 16;

        private static codeSchemaData = [0, 1];
        private static codeSchemaVersionData = [1, 1];
        private static codeAuthorityData = [2, 4];
        private static codeDomainData = [6, 2];
        private static codeLibraryData = [8, 2];
        private static codePriorityData: number[] = [10, 1];
        private static codeSeverityData = [11, 1];
        private static codeBaseCodeData = [12, 4];

        private static getCodePartCode(code: string, codePartData: number[]): string {
            return code.substr(codePartData[0], codePartData[1]);
        }

        private static getCodePartValue(codePartCode: string): number {
            return parseInt(codePartCode, 16);
        }

        private static getCodePartValueFromCode(code: string, codePartData: number[]): number {
            return Message.getCodePartValue(Message.getCodePartCode(code, codePartData));
        }

        private messageTemplate: (args: any[]) => string;
	}
}