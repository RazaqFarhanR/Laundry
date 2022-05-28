'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaksi,{
        foreignKey: "id_customer",
        as: "transaksi customer"
      })
      this.hasMany(models.transaksi,{
        foreignKey: "id_pegawai",
        as: "transaksi pegawai"
      })
      this.belongsTo(models.outlet,{
        foreignKey: "id_outlet",
        as: "outlet"
      })
    }
  }
  user.init({
    id_user:{
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    gender: DataTypes.ENUM("Laki-laki", "Perempuan"),
    phone: DataTypes.STRING,    
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM("owner","admin","kasir","customer"),
    id_outlet: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'user',
    tableName: "user"
  });
  return user;
};