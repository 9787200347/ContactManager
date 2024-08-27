 const express = require('express');
 const router  = express.Router();
 const {getContacts,deleteContact,getContact,postContact,updateContact} = require("../Coontroller/ConatctController");
 router.route("/").get(getContacts);
 router.route("/:id").get(getContact);
 router.route("/postContact/:id").post(postContact);
 router.route("/:id").put(updateContact);
 router.route("/:id").delete(deleteContact);
 
 module.exports = router;