import { useEffect, useState } from 'react';
import './App.css';
import { studentData } from './studentData';
import Table from 'react-bootstrap/Table';


function App() {
  const [data, setData] = useState([]);
  const [saveButton, setSaveButton] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [email, setEmail] = useState('');
  const [error , setError] = useState('');
  const numberPattern = new RegExp(/^[0-9\b]+$/);
  const emailPattern = new RegExp(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/);
  const namePattern = new RegExp(/^[a-zA-Z]{2,40}([a-zA-Z]{2,40})+$/)
  
  useEffect(() => {

    setData(localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : studentData);
  }, []);

  
  const addBUttonListener = (e) => {
    e.preventDefault();
    // const numberPattern = new RegExp(/^[0-9\b]+$/);
   
    if(id === '' || name ==='' || roll === '' || email === ''){
      setError('Please fill all input fields..');
    }
    else if(!numberPattern.test(id)){
      setError('Please enter numeric form of Id..');
    }
    else if(!numberPattern.test(roll)){
      setError('Please enter numeric form of roll number..');
    }
    else if(!emailPattern.test(email)){
      setError('Please enter email in valid format...')
    }
    else if(!namePattern.test(name)){
      setError('Please enter valid name..')
    }
 
    else{
      setError('');
    let dt = [...data];
    const newObject = {
      id: id,
      name: name,
      roll_number: roll,
      email_id: email
    }
    dt.push(newObject);
    let stringOfData = JSON.stringify(dt);
    localStorage.setItem('students', stringOfData);
    console.log(localStorage);

    setData(dt);
    setId('');
    setName('');
    setRoll('');
    setEmail('');
  }
  
  
  };
 
  const deleteButtonLlistener = (id) => {
    const dt = objectOfStudents.filter((item =>
      item.id !== id)
    );
    setData(dt);
    localStorage.setItem('students', JSON.stringify(dt));
  }

  const editBUttonListener = (id) => {
    const dt = data.filter(item => item.id === id);
    if (dt !== undefined) {
      setId(dt[0].id);
      setName(dt[0].name);
      setRoll(dt[0].roll_number);
      setEmail(dt[0].email_id);
    }
  }

  const saveButtonListener = () => {
    const index = data.map((item) => {
      return item.id;
    }).indexOf(id);

    const dt = [...data];
    dt[index].id = id;
    dt[index].name = name;
    dt[index].roll_number = roll;
    dt[index].email_id = email;
    localStorage.setItem('students', JSON.stringify(data));

    setData(dt);
  }

  const clearButtonListener = () => {

    setId(0);
    setName('');
    setRoll('');
    setEmail('');
  }

  let getStudent = localStorage.getItem('students');
  console.log(getStudent);
  let objectOfStudents = JSON.parse(getStudent);
  console.log(objectOfStudents);


  return (
    <div className="App">
     <h1>Student Data Store</h1>
      <div className='input-feilds'>
        <form>
          <input type='text' className='input-container' placeholder="Id in numeric form" onChange={(e) => setId(e.target.value)} value={id}></input>
          <input type='text' className='input-container' placeholder='NAME' onChange={(e) => setName(e.target.value)} value={name}></input>
          <input type='text' className='input-container' placeholder='ROLL NUMBER' onChange={(e) => setRoll(e.target.value)} value={roll}></input>
          <input type='text' className='input-container' placeholder='EMAIL ID' onChange={(e) => setEmail(e.target.value)} value={email}></input>
          {saveButton ? <button className='btn btn-success' onClick={saveButtonListener}><i class="fa-solid fa-floppy-disk"></i></button> : <button className='btn btn-success' onClick={addBUttonListener}><i class="fa-solid fa-plus"></i></button>}
          <button className='btn btn-danger' onClick={() => clearButtonListener(data.id)}>Clear</button>
        </form>
      </div>
      
      <>
      <p className='error'>{error}</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Id</th>
              <th>Name</th>
              <th>Roll Number</th>
              <th>Email Id</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.roll_number}</td>
                  <td>{item.email_id}</td>
                  <td><button className='btn btn-primary' onClick={() => {
                    editBUttonListener(item.id);
                    setSaveButton(true);
                  }}><i class="fa-solid fa-pen-to-square"></i></button></td>
                  <td><button className='btn btn-danger' onClick={() => deleteButtonLlistener(item.id)}><i class="fa-solid fa-trash"></i></button></td>
                </tr>
              )
            }
            )
            }
          </tbody>
        </Table>
      </>
            <p>Copyright © 2024 Vishal Patil All Rights Reserved.</p>
    </div>
  );
}

export default App;
