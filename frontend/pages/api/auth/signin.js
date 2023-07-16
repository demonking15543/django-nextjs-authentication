import axios from 'axios';

export default async function signin(req, res) {
  const { username, password } = req.body;

  try {
    // Make a request to your Django backend to authenticate the user
    const response = await axios.post('http://127.0.0.1:8000/login/', {
      username,
      password,
    });

    if (response.data) {
      // If authentication is successful, return the user data
      res.status(200).json({ success: true, user: response.data });
    } else {
      // If authentication fails, return an error message
      res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
}
