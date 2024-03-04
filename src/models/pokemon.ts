import { Table, Column, Model, HasMany, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: "pokemons",
    modelName: "pokemon",
    updatedAt: false
})
class Pokemon extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare name: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare cp: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare hp: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare picture: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare type: string;

    @CreatedAt
    declare created: Date
}

export default Pokemon;