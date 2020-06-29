/**
 * Created by WebStorm
 * User: Md. Toufiqul Islam
 * Date: 6/29/2020
 * Time: 6:57 PM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import {provide} from "inversify-binding-decorators";
import {InsertResult} from "typeorm";
import {User} from "../entity/User";
import {SqlConnectionProvider} from "../providers/SqlConnection.Provider";


@provide(NoteRepository)
export class NoteRepository {
    private connection;

    constructor() {
        this.connection = SqlConnectionProvider.getConnection()
    }

    async add(note: any): Promise<User> {
        return this.connection
            .queryBuilder()
            .insert()
            .into(User)
            .values(note)
            .output(['id', 'note'])
            .execute()
            .then((value: InsertResult) => {
                return value.generatedMaps[0];
            });

    }
}
