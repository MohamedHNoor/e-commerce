const getAllUsers = async (req, res) => {
  res.json({ success: true, message: 'Get all users' })
}

const getSingleUser = async (req, res) => {
  res.json({ success: true, message: 'Get single user' })
}

const showCurrentUser = async (req, res) => {
  res.json({ success: true, message: 'Show current user' })
}

const updateUser = async (req, res) => {
  res.json({ success: true, message: 'Update user' })
}

const updateUserPassword = async (req, res) => {
  res.json({ success: true, message: 'Update user password' })
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
