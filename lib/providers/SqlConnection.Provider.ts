import {Connection, createConnection} from 'typeorm';

export class SqlConnectionProvider {
    static connection: Connection;

    constructor() {
        console.log('Initializing SQL Connection Provider');
    }

    static async connectionSetup() {
        if (!this.connection) {
            this.connection = await createConnection();
        }
        return this.connection;
    }


}
