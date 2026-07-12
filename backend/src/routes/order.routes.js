const express = require("express");

const router = express.Router();

const controller = require("../controllers/order.controller");



router.post("/",controller.createOrder);

router.get("/",controller.getOrders);

router.get("/:id",controller.getOrder);

router.put("/:id",controller.updateOrder);

router.delete("/:id",controller.deleteOrder);

module.exports = router;