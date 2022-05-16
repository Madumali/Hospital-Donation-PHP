const express = require("express");

const router = express.Router();
const issuanceService = require("./issuance.service");



router.post("/", registerIssuance);


module.exports = router;

function registerIssuance(req, res, next)
{
    issuanceService
     .registerIssuance(req.body)
    .then((response) => {
        res.status(response.status);
        res.json(response);
    })
    .catch(next);
}