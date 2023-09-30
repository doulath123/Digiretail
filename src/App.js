import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import {MdDelete} from "react-icons/md"
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const [newUser, setNewUser] = useState({ name: '', email: '', street:'',suite:'',city:'',zipcode:'', companyname: '', companycatchPhrase:'',companybs:'' });
  
  const storedUsers = JSON.parse(localStorage.getItem('users'));
 
  useEffect(() => {
    // Fetch user data from local storage
    if (storedUsers) {
      setUsers(storedUsers);
      setFilteredUsers(storedUsers);
    } else {
      // If no data in local storage, fetch from the API
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setFilteredUsers(data);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, []);

  // useEffect(() => {
  //   // Fetch user data from the API on component mount
  //   fetch('https://jsonplaceholder.typicode.com/users')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUsers(data);
  //       setFilteredUsers(data);
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  useEffect(() => {
    // Save user data to local storage whenever it changes
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm)
    );
    setFilteredUsers(filteredUsers);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email && newUser.street && newUser.suite && newUser.city && newUser.zipcode && newUser.companyname && newUser.companycatchPhrase && newUser.companybs) {
     
      setNewUser({ name: '', email: '', street: '', suite: '', city:'', zipcode :'', companyname: '', companycatchPhrase: '', companybs: '' });
      console.log(newUser.name)
      const unique_id = uuid();
      const small_id = unique_id.slice(0,8)
      const obj={
        "id": small_id,
        "name": newUser.name,
        "email": newUser.email,
        "address": {
          "street": newUser.street,
          "suite":newUser.suite,
          "city": newUser.city,
          "zipcode": newUser.zipcode
        },
        "company": {
          "name": newUser.companyname,
          "catchPhrase": newUser.companycatchPhrase,
          "bs": newUser.companybs
        }
      }
      setUsers([...users, obj]);
      setFilteredUsers([...filteredUsers,obj])
      localStorage.setItem('users', JSON.stringify([...users, obj]));
    }
    else {
      alert('Please fill in all fields.');
    }
  };

  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    const updatedFilteredUsers = filteredUsers.filter(
      (user) => user.id !== id
    );
    setFilteredUsers(updatedFilteredUsers);
  };

 

  return (
    <div className="App">
      <div className="add-user">
        <h2>Add User</h2>
        <form onSubmit={handleAddUser}>
        <input
        required
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        /><br/>
        <input
        required
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        /><br/>
        <input
        required
          type="text"
          placeholder="Street"
          value={newUser.street}
          onChange={(e) => setNewUser({ ...newUser, street: e.target.value })}
        /><br/>
        <input
        required
          type="text"
          placeholder="Suite"
          value={newUser.suite}
          onChange={(e) => setNewUser({ ...newUser, suite: e.target.value })}
        /><br/>
        <input
        required
          type="text"
          placeholder="City"
          value={newUser.city}
          onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
        /><br/>
        <input
        required
          type="text"
          placeholder="Zipcode"
          value={newUser.zipcode}
          onChange={(e) => setNewUser({ ...newUser, zipcode: e.target.value })}
        /><br/>
        <input
        required
          type="text"
          placeholder="Company Name"
          value={newUser.companyname}
          onChange={(e) => setNewUser({ ...newUser, companyname: e.target.value })}
        /><br/>
        <input
        required
          type="text"
          placeholder="Company Catch Phrase"
          value={newUser.companycatchPhrase}
          onChange={(e) => setNewUser({ ...newUser, companycatchPhrase: e.target.value })}
        /><br/>
        <input
        required
          type="text"
          placeholder="Company BS"
          value={newUser.companybs}
          onChange={(e) => setNewUser({ ...newUser, companybs: e.target.value })}
        /><br/>
        <button onClick={handleAddUser}>Add</button>
        </form>
        
        
      </div>
      <h1>User Management System</h1>
      <input
        type="text"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearch}
      />
     
 <table>
        
        <thead >
<tr>
  <th colSpan="2" >User Info</th>
  <th colSpan="4">Address</th>
  <th colSpan="3" >Company Info</th>
</tr>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">City</th>
            <th scope="col">Street</th>
            <th scope="col">Zipcode</th>
            <th scope="col">Suite</th>
            <th scope="col">Company Name</th>
            <th scope="col">Company catchPhrase</th>
            <th scope="col">Company bs</th>

            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td> 
              <td>{user.address.street}</td> 
              <td>{user.address.zipcode}</td> 
              <td>{user.address.suite}</td>
              <td>{user.company.name}</td>
              <td>{user.company.catchPhrase}</td>
              <td>{user.company.bs}</td>
             
              
              <td className='deletbutton' onClick={() => handleDeleteUser(user.id)}>
                <MdDelete/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

  












      
    </div>
  );
}

export default App;

