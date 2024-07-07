import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class nguoi_dung extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    nguoi_dung_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    mat_khau: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    ho_ten: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    tuoi: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    refresh_token: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    anh_dai_dien: {
      type: DataTypes.STRING(250),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'nguoi_dung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nguoi_dung_id" },
        ]
      },
    ]
  });
  }
}
