var model = require('../models/user');
var generalConst = require('../constant/general')

UserController = {
    /**
     * get list of user
     */
    listUser: function(response) {
        model.find(function(err, products){
            if(err) {
                return response({
                    "result" : "failed",
                    "message" : err,
                    "data" : {}
                })
            } else {
                return response({
                    "result" : "success",
                    "message" : "List existing  user",
                    "code" : 200,
                    "data" : products
                });
            }
        })
    },
    /**
     * Store data to mongo
     */
    storeData: function(data, response) {
        return response(datax);
        model.create(data, function (err, post) {
            if (err) {
                return response({
                    "result" : "failed",
                    "message" : err,
                    "data" : {}
                })
            }
            return response({
                "result" : "success",
                "message" : "Sukses redkjaksgister",
                "code" : 200,
                "data" : post
            });
        });
    },
    
    /**
     * Update data
     */
    updateUser: function(id, data, response) {
        model.findByIdAndUpdate(id, data, function(err, post) {
            if (err) {
                return response(generalConst.apiError(err.message, 400))
            } else {
                return response({
                    "result" : "success",
                    "message" : "Update sukses",
                    "code" : 200,
                    "data" : post
                });
            }
        })
    },

    /**
     * Update data
     */
    deleteUser: function(id, response) {
        model.findByIdAndRemove(id, function(err, post) {
            if (err) {
                return response(generalConst.apiError(err.message, 400))
            } else {
                return response({
                    "result" : "success",
                    "message" : "delete sukses",
                    "code" : 200,
                    "data" : {}
                });
            }
        })
    }
}

module.exports = UserController;