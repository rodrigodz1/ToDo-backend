var express = require('express')
const router = express.Router()
const taskController = require("../controllers/taskController")


router.post("/create", taskController.createTask)
router.get("/", taskController.getTasks)
router.get("/:id", taskController.getOneTask)
router.put("/:id", taskController.update)
router.delete("/:id", taskController.delete)

module.exports = router