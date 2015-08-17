module Diles {
    export interface IMessageDefinition {
        messagePrefix: string;
        messageTemplate: (args: any[]) => string;
    }
}