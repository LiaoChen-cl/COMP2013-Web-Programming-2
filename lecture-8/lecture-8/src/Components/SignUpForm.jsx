import { useState } from 'react';

export default function SignUpForm() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser(prevUser => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
        `Form submitted\nUsername: ${user.username}\nEmail: ${user.email}\nPassword: ${user.password}`
    );
    setUser({
      username: "",
      email: "",
      password: ""
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={user.username} onChange={handleChange} />
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={user.password} onChange={handleChange} />
        <br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={user.email} onChange={handleChange} />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
