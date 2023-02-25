import React, { useState, useEffect } from "react";
import { get_call, post_call } from "../../apicall/api";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./index.css";
const Home = () => {
  const [tableData, setTableData] = useState([]);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    getdata();
  }, []);

  function viewData(obj) {
    setId(obj.id);
    setFirstName(obj.first_name);
    setLastName(obj.last_name);
    setEmail(obj.email);
  }

  function deleteData(index) {
    let tempArr = tableData;
    tempArr.splice(index, 1);
    setTableData([...tempArr]);
  }
  function updatedata(obj) {
    setDisable(false);
  }

  async function getdata() {
    let response = await get_call("https://reqres.in/api/users?page=1");
    setTableData(response.data);
  }

  async function update() {
    let payload = {
      name: "chetan",
      job: "software developer",
    };
    let response = await post_call(
      `https://reqres.in/api/users/${id}/`,
      payload
    );
    // console.log(response.data);
    // setTableData(response.data);
    // getdata();
  }
  return (
    <>
     <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />} 
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
           <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
         
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Action</TableCell>
              </TableRow>
        </TableHead>
        <TableBody>
            {tableData.length > 0 ? (
              tableData.map((obj, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{obj.id}</TableCell>
                    <TableCell>{obj.first_name}</TableCell>
                    <TableCell>{obj.last_name}</TableCell>
                    <TableCell>{obj.email}</TableCell>
                    <TableCell>
                      <Button variant="outlined" onClick={() => viewData(obj)}>View</Button>
                      <Button variant="outlined" onClick={() => updatedata(obj)}>
                        Edit/Update
                      </Button>
                      <Button variant="outlined" onClick={() => deleteData(index)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <span>No Data Found</span>
            )}
           </TableBody>
      </Table>
    </TableContainer>
    </Typography>
        </AccordionDetails>
      </Accordion>
      <div style={{ textAlign: "left", padding: "10px" }}>
        Selected Data:
        <div>
          Id :<input type="text" value={id} disabled={disable}></input>{" "}
        </div>
        <div>
          Name :<input type="text" value={firstName}></input>
        </div>
        <div>
          City : <input type="text" value={lastName}></input>
        </div>
        <div>
          Contact :<input type="text" value={email}></input>
        </div>
        <div>
          <button type="button" onClick={() => update()}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
