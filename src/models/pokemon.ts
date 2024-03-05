import { Table, Column, Model, DataType, CreatedAt } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: "pokemons",
    modelName: "pokemon",
    updatedAt: false
})
class Pokemon extends Model {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true
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
        allowNull: false,
        get() {
            if (this.getDataValue('types') && this.getDataValue('types').indexOf(',') > -1) {
                return this.getDataValue('types').split(',')
            }
            return this.getDataValue('types')
        },
        set(types: []) {
            this.setDataValue('types', types.join())
        }
    })
    declare types: string;

    @CreatedAt
    declare created: Date
}

export default Pokemon;