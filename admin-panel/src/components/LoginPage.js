import React, {Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import '../App.css'

class LogInPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            input: {},
            errors: {},
            responseError:{}
        };
        this.validate = this.validate.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState(input);
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }

        if (input["email"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (input["password"] && input["password"].length < 6) {
          isValid = false;
          errors["password"] = "Please add at least 6 charachter.";
        }

        this.setState({ errors: errors });
        return isValid;
    }
    handleSubmit = async (e) => {
      e.preventDefault();
        const { email, password } = this.state.input;
        let responseError = {};
        if (this.validate()) {
          try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };
            const { data } = await axios.post(
              `http://localhost:4000/users/login`,
                {
                  email: email,
                  password: password
                },
                config
            ).then(response => {
            //   console.log('response', response);
              const role = response.data.data.user.role
              if(role ==="admin"||role ==="ADMIN"||role ==="Admin")
              {
                window.localStorage.setItem('token', response.data.data.token);
                // alert('User logged-in successfully');
                this.props.history.push("/home");
              }
              else {
                responseError['responseError'] = 'User must be admin'
                // alert('User must be admin')
                this.setState({ responseError: responseError});
                this.props.history.push("/login");
              }
            });
           } catch (e) {
            responseError['responseError']=e.response.data.error
            this.setState({ responseError: responseError });
          }
        }
        else {
            console.log(this.state.errors)
        }
      }


    render(){
        return (
            <>
            <div className="text-center m-5-auto">
                <h2>Sign in</h2>
                <form onSubmit={this.handleSubmit} >
                    <div className="text-danger">{this.state.responseError.responseError}</div>
                    <p>
                        <label>email address</label><br />
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleChange}
                            />
                    </p>
                    <div className="text-danger">{this.state.errors.email}</div>
                    <p>
                        <label>Password</label>
                        <Link to="/forget-password">
                            <label className="right-label">Forget password?</label></Link>
                        <br />
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleChange}
                            />
                    </p>
                    <div className="text-danger">{this.state.errors.password}</div>
                    <p>
                        <button id="sub_btn">Login</button>

                    </p>
                </form>
                <footer>
                    <p>First time? <Link to="/register">Create an account</Link>.</p>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
            </>
        )
    }

}
export default LogInPage