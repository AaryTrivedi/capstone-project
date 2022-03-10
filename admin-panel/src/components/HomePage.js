import React, { useEffect } from 'react'
import jwt from 'jwt-decode'
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap'
import { useState } from 'react';
import { approvedDriversList, pendingDriversList, approveDocuments } from '../api/users'
import { getDocumentByuserId } from '../api/documents'


function HomePage({ navigation }) {
    let history = useHistory()
    const [approvedData, setApprovedData] = useState([])
    const [pendingData, setPendingData] = useState([])
    const [documentData, setDocumentData] = useState([])
    const [verify, setVerify] = useState(false)
    const [driverDetailsValid,setDriverDetailsValid] = useState()
    let Token = localStorage.getItem('token')
    if (Token === null || Token === "" || Token === undefined) {
        window.location.href = "http://localhost:3000/login"
    }
    useEffect(() => {
        async function fetchData() {
            await approvedDriversList().then((value) => setApprovedData(value.data))
            await pendingDriversList().then((value) => setPendingData(value.data))

        }
        fetchData()
    }, [])


    const setData = (_id, firstName, driverDetailsValid) => {
        window.localStorage.setItem('tempId',_id)
        window.localStorage.setItem('tempName', firstName)
        setDriverDetailsValid(driverDetailsValid) 
        getDocumentByuserId(_id).then((value) => {
            setDocumentData(value.data)
        })
    }

    const displayDocumentList =
        documentData.map((info) => {
            return (
                <tr key={info._id}>
                    <td>{info.documentType}</td>
                    <td><a href={'http://localhost:4000/document/file/' + info.documentName} target='_blank'>View File</a></td>
                </tr>
            )
        })
    const user = jwt(Token)

    const DisplayPendingData = pendingData.map(
        (info) => {
                return (
                    <tr key={info._id}>
                        <td>{info.firstName}</td>
                        <td>{info.lastName}</td>
                        <td>{info.email}</td>
                        <td><button type="button" className="btn btn-link" onClick={() => setData(info._id, info.firstName, info.driverDetailsValid)}>see document list</button></td>
                    </tr>
                )
            }
    )
    const DisplayApprovedData = approvedData.map(
        (info) => {
            if (approvedData !== undefined || approvedData !== null || approvedData !== '') {
                return (
                    <tr key={info._id}>
                        <td>{info.firstName}</td>
                        <td>{info.lastName}</td>
                        <td>{info.email}</td>
                        <td><button type="button" className="btn btn-link" onClick={() => setData(info._id, info.firstName, info.driverDetailsValid)}>see document list</button></td>
                    </tr>
                )
            }
            else {
                return
            }
        }
    ) 

    const submitVerification = async()=>{
        const _id = localStorage.getItem('tempId')
        if(verify)
            await approveDocuments(_id,verify,user._id).then((response)=>console.log(JSON.stringify(response)))
        else{
            alert('Please review the documents first')
        }
        // await approvedDriversList().then((value) => setApprovedData(value.data))
        // await pendingDriversList().then((value) => setPendingData(value.data))
    }
    const handleLogout = () => {
        localStorage.clear();
        history.push("/")
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand>Welcome to Admin Panel</Navbar.Brand>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Navbar.Text>Logged in as {user.firstName} {user.lastName}</Navbar.Text>
                        </Nav>
                        <Nav>
                            <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {pendingData.length === 0 ?
            null
            :
            <>
            <ul className="text-center">Pending users list</ul>
            <div className="container">
                <div className="text-center">
                    <table style={{ width: '65%' }} className="container table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DisplayPendingData}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
            }   
            {approvedData.length === 0 ?
            null
            :
            <>
            <ul className="text-center">Approved users list</ul>

            <div className="container">
                <div className="text-center">
                    <table style={{ width: '65%' }} className="container table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DisplayApprovedData}
                        </tbody>
                    </table>
                </div>
            </div>
            </>
            }
            <div className="container">
                <div className="text-center">
                    {documentData.length === 0 ?
                    <div>
                            <span>No document uploaded</span>
                    </div> 
                    :
                    <div>
                            <header><h3><b>Document Uploaded by {window.localStorage.getItem('tempName')}</b></h3></header>
                        <table style={{ width: '65%' }} className="container table">
                        <thead>
                            <tr>
                                <th>Document Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayDocumentList}
                        </tbody>  
                    </table>
                    
                    {
                        driverDetailsValid?
                        null
                        :
                        (
                        <form className="container text-center" style = {{ width: "30%" }} onSubmit={() => submitVerification()}>
                            <div className="container text-center" style={{display: "flex",width: "60%" }}>
                                <label for={'Approve'}>Approve Documents
                                </label>
                                <input style={{alignSelf:'center'}} id='Approve' type='checkbox' defaultChecked={verify} onClick={()=>setVerify(!verify)}></input>
                                <br/>
                                <button 
                                    className={verify ? "btn btn-success":"btn btn-secondary"}>Approve
                                </button>
                            </div>
                        </form>
                        )  
                    }
                    </div>   
                }
                </div>

         </div>
        </>
    )
}

export default HomePage;