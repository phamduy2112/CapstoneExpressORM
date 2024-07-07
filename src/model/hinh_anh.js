import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class hinh_anh extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    hinh_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ten_hinh: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    duong_dan: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    mo_ta: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    nguoi_dung_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nguoi_dung',
        key: 'nguoi_dung_id'
      }
    }
  }, {
    sequelize,
    tableName: 'hinh_anh',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "hinh_id" },
        ]
      },
      {
        name: "fk_hinhAnh_nguoiDung",
        using: "BTREE",
        fields: [
          { name: "nguoi_dung_id" },
        ]
      },
    ]
  });
  }
}
