import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const navigate = useNavigate();

  const getData = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      'https://user-auth-backend.vercel.app/dashboard',
      {
        headers: { Authorization: `${token}` },
      }
    );
    setUsers(response.data.data); // set the users state to the retrieved data
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const selectedIds = users.map((user) => user.email);
    setSelectedRows(isChecked ? selectedIds : []);
  };

  const handleRowSelect = (event, email) => {
    const isChecked = event.target.checked;
    setSelectedRows((prevSelected) =>
      isChecked
        ? [...prevSelected, email]
        : prevSelected.filter((id) => id !== email)
    );
    setSelectAll(false);
  };

  const handleBlock = async () => {
    try {
      const response = await axios.post(
        'https://user-auth-backend.vercel.app/block-users',
        { emailList: selectedRows },
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      alert(response.data.message);
      setSelectedRows([]);
      setSelectAll(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnblock = async () => {
    try {
      const response = await axios.post(
        'https://user-auth-backend.vercel.app/unblock-users',
        { emailList: selectedRows },
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      alert(response.data.message);
      setSelectedRows([]);
      setSelectAll(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        'https://user-auth-backend.vercel.app/delete-users',
        { emailList: selectedRows },
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      alert(response.data.message);
      setSelectedRows([]);
      setSelectAll(false);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='dashboard'>
      <div className='logout'>
        <Button variant='primary' onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <h1 className='title'>Dashboard</h1>
      <div className='toolbar'>
        <Button variant='danger' onClick={handleBlock}>
          Block
        </Button>
        <Button variant='success' onClick={handleUnblock}>
          Unblock
        </Button>
        <Button variant='outline-danger' onClick={handleDelete}>
          Delete
        </Button>
      </div>
      <Table striped bordered hover className='table'>
        <thead>
          <tr>
            <th>
              <Form.Check
                type='checkbox'
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Last Login Time</th>
            <th>Registration Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td>
                <Form.Check
                  type='checkbox'
                  checked={selectedRows.includes(user.email)}
                  onChange={(event) => handleRowSelect(event, user.email)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {moment(user.last_login_time).format('HH:mm:ss, DD.MM.YYYY')}
              </td>
              <td>
                {moment(user.registration_time).format('HH:mm:ss, DD.MM.YYYY')}
              </td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Dashboard;
