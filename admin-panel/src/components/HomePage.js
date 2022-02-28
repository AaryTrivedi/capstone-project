import React from 'react'
import { Link } from 'react-router-dom'
import JsonData from './data.json'
import jwt from 'jwt-decode'
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Container,NavDropdown} from 'react-bootstrap'

function HomePage({navigation}) {
    let history = useHistory()
    let Token = localStorage.getItem('token')
    if (Token === null || Token === "" || Token === undefined){
        window.location.href = "http://localhost:3000/login"
    }
    const user = jwt(Token)
    const DisplayData=JsonData.map(
        (info,idx)=>{
            return(
                <tr key={idx}>
                    <td>{info.id}</td>
                    <td><a href= "#">{info.name}</a></td>
                    <td>{info.city}</td>
                    <td>{info.Registered}</td>
                    <td>{info.Phone}</td>
                </tr>
            )
        }
    ) 

    const handleLogout=()=>{
        localStorage.clear();
        history.push("/")
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Welcome to Admin Panel</Navbar.Brand>
                    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                            <Navbar.Text>Logged in as {user.firstName} {user.lastName}</Navbar.Text>
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={()=>handleLogout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="text-center">
                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Sr.NO</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Registerd</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DisplayData}

                        </tbody>
                    </table>

                </div>
                </div>
        </>
    )}
 
export default HomePage;
