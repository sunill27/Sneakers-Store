import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "payments",
  modelName: "Payment",
})
class Payment extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM("COD", "KHALTI"),
    allowNull: false,
  })
  declare paymentMethod: string;

  @Column({
    type: DataType.ENUM("paid", "unpaid"),
    defaultValue: "unpaid",
  })
  declare paymentStatus: string;

  @Column({
    type: DataType.STRING,
  })
  declare pidx: string;
}

export default Payment;
