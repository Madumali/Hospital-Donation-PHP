const express = require("express");

const router = express.Router();
const requestService = require("./request.service");

router.get("/requestTotals/:start/:end", getRequestItemTotal);
router.get("/requestDetails/:start/:end", selectAllRequestDetails);
router.get("/required", selectRequired);
router.post("/", registerRequest);


module.exports = router;


function getRequestItemTotal(req, res, next)
{
    requestService
    .getRequestItemTotal(req.params.start, req.params.end)
    .then((required) => res.json(required))
    .catch(next);
}

function selectAllRequestDetails(req, res, next)
{
    requestService
    .selectAllRequestDetails(req.params.start, req.params.end)
    .then((required) => res.json(required))
    .catch(next);
}

function selectRequired(req, res, next)
{
    requestService
    .selectRequired()
    .then((required) => res.json(required))
    .catch(next);
}

function registerRequest(req, res, next)
{
    requestService
     .registerRequest(req.body)
    .then((response) => {
        res.status(response.status);
        res.json(response);
    })
    .catch(next);
}