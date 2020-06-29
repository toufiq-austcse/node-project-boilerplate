import {Connection, createConnection} from "typeorm";

export class SqlConnectionProvider {
    private static connection: Connection;

    public static async getConnection(): Promise<Connection> {
        if (SqlConnectionProvider.connection) {
            return SqlConnectionProvider.connection;
        }

        SqlConnectionProvider.connection = await createConnection();
        return SqlConnectionProvider.connection;
    }
}
