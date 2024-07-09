import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class luu_anh extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    luu_anh_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nguoi_dung_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nguoi_dung',
        key: 'nguoi_dung_id'
      }
    },
    hinh_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'hinh_anh',
        key: 'hinh_id'
      }
    },
    ngay_luu: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'luu_anh',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "luu_anh_id" },
        ]
      },
      {
        name: "fk_luuAnh_hinhAnh",
        using: "BTREE",
        fields: [
          { name: "hinh_id" },
        ]
      },
      {
        name: "fk_luuAnh_nguoiDung",
        using: "BTREE",
        fields: [
          { name: "nguoi_dung_id" },
        ]
      },
    ]
  });
  }
}
