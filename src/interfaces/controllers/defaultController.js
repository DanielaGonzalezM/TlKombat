const { response, request } = require("express");

const defaultGet = (req = request, res = response) => {
    res.json({
        msg: "Ready to play ...",
    });
};

const othersGet = (req = request, res = response) => {
    res.json({
        msg: "ups this fight is not ready yet...",
    });
};

module.exports={
    defaultGet,
    othersGet
}