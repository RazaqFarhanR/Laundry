'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user,{
        foreignKey: "id_customer",
        as: "customer"
      })
      this.belongsTo(models.user,{
        foreignKey: "id_pegawai",
        as: "pegawai"
      })
      this.belongsTo(models.outlet,{
        foreignKey: "id_outlet",
        as: "outlet"
      })
      this.hasMany(models.detail_transaksi,{
        foreignKey: "id_transaksi",
        as: "detail_transaksi"
      })
    }
  }
  transaksi.init({
    id_transaksi:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    id_customer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_pegawai: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_outlet: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tgl: DataTypes.DATE,
    batas_waktu: DataTypes.DATE,
    tgl_bayar: DataTypes.DATE,
    status: DataTypes.ENUM("baru","diproses","selesai","diambil"),
    pembayaran: DataTypes.ENUM("dibayar","belum_dibayar"),
  }, {
    sequelize,
    modelName: 'transaksi',
    tableName: 'transaksi'
  });
  return transaksi;
};