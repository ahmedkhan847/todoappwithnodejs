"use strict";
module.exports = function (sequelize, DataTypes) {
    var Logs = sequelize.define("Logs", {
        request: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        response: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        logged_in: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Logs.log = function (request, responses, userid, message) {
        try {
            var req = Logs.req;
           
            Logs.create({
                request: JSON.stringify(request),
                response: JSON.stringify(responses),
                user_id: userid,
                logged_in: message
            }).catch(function (e) {
                console.log(e);
            })

        } catch (e) {
            console.log(e)
        }
    }

    return Logs;
};