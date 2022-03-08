import React, { useEffect } from 'react'
import jwt from 'jwt-decode'
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar,Nav,Container} from 'react-bootstrap'
import { useState } from 'react';
import { approvedDriversList, pendingDriversList} from '../api/users'
import {getDocumetnByuserId} from '../api/documents'
import { Viewer } from '@react-pdf-viewer/core'
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core';

function HomePage({navigation}) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    let history = useHistory()
    const [approvedData,setApprovedData] = useState([])
    const [pendingData,setPendingData] = useState([])
    const [documentData,setDocumentnData] = useState([])
    const [id,setId] =useState()
    let Token = localStorage.getItem('token')
    if (Token === null || Token === "" || Token === undefined){
        window.location.href = "http://localhost:3000/login"
    }
    useEffect(() => {
        approvedDriversList().then((value) => setApprovedData(value.data))
        pendingDriversList().then((value) => setPendingData(value.data))
    }, [])

    const setData = (_id) =>{
        getDocumetnByuserId(_id).then((value)=>setDocumentnData(value.data))
    }
    const displayDocumentList = 
        documentData.map((info)=>{
            if (pendingData !== undefined || pendingData !== null || pendingData !== '') {
                return (
                    <tr key={info._id}>
                        {/* <td>
                        <h4>View PDF</h4>
                        <div className='pdf-container'> */}
                            {/* {info.documentUri && <><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                                <Viewer fileUrl={info.documentUri}
                                    plugins={[defaultLayoutPluginInstance]} />
                            </Worker></>} */}

                            {/* {!info.documentUri && <>No pdf file selected</>} */}
                        {/* </div>
                        </td> */}
                    </tr>
                )
            }
            else {
                return
            }
        })
    const user = jwt(Token)

    const DisplayPendingData = pendingData.map(
        (info) => {
            if (pendingData !== undefined || pendingData !== null || pendingData !== '') {
                return (
                    <tr key={info._id}>
                        <td>{info.firstName}</td>
                        <td>{info.lastName}</td>
                        <td>{info.email}</td>
                        <td><button type="button" className="btn btn-link" onClick={() => setData(info._id)}>see document list</button></td>
                    </tr>
                )
            }
            else {
                return
            }
        }
    ) 
    // const DisplayApprovedData = approvedData.map(
    //     (info) => {
    //         if (approvedData !== undefined || approvedData !== null || approvedData !== '') {
    //             return (
    //                 <tr key={info._id}>
    //                     <td>{info.firstName}</td>
    //                     <td>{info.lastName}</td>
    //                     <td>{info.email}</td>
    //                     <td><button type="button" className="btn btn-link" onClick={() => setData(info._id)}>see document list</button></td>
    //                 </tr>
    //             )
    //         }
    //         else {
    //             return
    //         }
    //     }
    // ) 

    const handleLogout=()=>{
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
                            <Nav.Link onClick={()=>handleLogout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ul className="text-center">Pending users list</ul>
            <div className="container">
                <div className="text-center">
                    <table style={{ width: '65%' }} className="container table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DisplayPendingData}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <ul className="text-center">Approved users list</ul> */}
            {/*
             <div className="container">
                <div className="text-center">
                    <table style={{ width: '65%' }} className="container table table-striped">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {DisplayApprovedData}
                        </tbody>
                    </table>
                </div>
            </div> 
            */}
            <div className="container">
                <div className="text-center">
                    <table style={{ width: '65%' }} className="container table table-striped">
                        <thead>
                            <tr>
                                <th>document list</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayDocumentList}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='container text-center'>
                <h1>{id}</h1>
            </div>
        </>
    )}
 
export default HomePage;