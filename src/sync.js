import { Sequelize } from "sequelize";
import { sequelizeConfigProps } from "../config.js";
import { operations } from "./operations.js";

const sequelizeConnection = new Sequelize(
    "quotes_db",
    "root",
    "",
    sequelizeConfigProps
);

export const Languages = sequelizeConnection.define("languages", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export const Countries = sequelizeConnection.define("countries", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export const Categories = sequelizeConnection.define("categories", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
});

export const Authors = sequelizeConnection.define("authors", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});


export const Quotes = sequelizeConnection.define("quotes", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    key: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    value: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Authors.belongsTo(Countries);
Countries.hasMany(Authors);

Quotes.belongsTo(Authors);
Authors.hasMany(Quotes);

Quotes.belongsTo(Categories);
Categories.hasMany(Quotes);

Quotes.belongsTo(Languages);
Languages.hasMany(Quotes);

export { sequelizeConnection };