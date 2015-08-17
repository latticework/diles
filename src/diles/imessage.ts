/// <reference path="./priority.ts" />
/// <reference path="./severity.ts" />
module Diles {
    export interface IMessage {
        code: string;
        objectKey: string;
        propertyNames: string[];
        message: string;
        args: any[];
    
        priority: MessagePriority;
        severity: MessageSeverity;
    }
}