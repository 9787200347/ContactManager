const Contact = require("../model/Contactschema");
const asyncHandler = require("express-async-Handler");
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find();
  res.status(200).json(contact);
});
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});
const postContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Invalid");
  }
  const contact = await Contact.create({ name, email, phone });
  console.log(req.body);
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Contact Not Found" });
  const upcontact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(upcontact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) return res.status(404).json({ message: "Contact Not Found" });
  await contact.remove();
  res.status(200).json({ message: "Contact Deleted" });
});
module.exports = {
  getContacts,
  getContact,
  postContact,
  deleteContact,
  updateContact,
};
