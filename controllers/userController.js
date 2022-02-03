const { v4: uuidv4 } = require("uuid");

let users = [];

exports.getUser = (req, res) => {
  res.send(users);
};

exports.createUser = (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`User with the name ${user.firstName} added to the database!`);
};

exports.getUserWhithId = (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === Number(id));

  res.send(foundUser);
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send(`User with this id: ${id} deleted from database`);
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const userToUpdate = users.find((user) => user.id == id);

  if (firstName) userToUpdate.firstName = firstName;
  if (lastName) userToUpdate.lastName = lastName;
  if (age) userToUpdate.age = age;
  res.send(`User with the id ${id} has been updated`);
};

exports.updateAllUser = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  const userToUpdate = users.find((user) => user.id == id);

  if (firstName) userToUpdate.firstName = firstName;
  if (lastName) userToUpdate.lastName = lastName;
  if (age) userToUpdate.age = age;
  res.send(`User with the id ${id} has been updated`);
};
