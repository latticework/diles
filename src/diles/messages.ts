module Diles {
    export module DilesMessages {
        export var authority: number = Authorities.diles;
        export enum Domains {
            core = 0x00,
        }

        export enum CoreLibraries {
            core = 0x00,
        }

        export function CreateMessage(messagePrefix: string, severity: MessageSeverity, ...args: any[]): IMessage {
            return new Message();
        }
    }
}