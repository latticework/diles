module Diles {
    export class MessageError {
        constructor(public messages: Message[]) {
            let severity = MessageArray.getSeverity(messages);
            if (severity > MessageSeverity.Error) {
                throw new Error(`The message array must have an error severity. Yours, '${severity}', is not.`);
            }
        }

        public get message() {
            return MessageArray.getErrors(this.messages)[0].message;
        }
    }
}