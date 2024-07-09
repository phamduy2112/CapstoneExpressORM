import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class binh_luan extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    binh_luan_id: {
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
    ngay_binh_luan: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    noi_dung: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'binh_luan',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "binh_luan_id" },
        ]
      },
      {
        name: "fk_binhLuan_nguoiDung",
        using: "BTREE",
        fields: [
          { name: "nguoi_dung_id" },
        ]
      },
      {
        name: "fk_binhLuan_hinhAnh",
        using: "BTREE",
        fields: [
          { name: "hinh_id" },
        ]
      },
    ]
  });
  }
}
