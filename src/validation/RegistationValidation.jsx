import React from 'react'
import * as Yup from 'yup';

 const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



const RegistationValidation = Yup.object({
       fullName: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .min(5, 'Minimum 5 characters or less')
              .required('Please Enter Your Name'),
       email: Yup.string()
              .email('Invalid Email Address')
              .matches(emailregex, 'Checking Regex')
              .required('Please Enter Your Email Address'),
       password: Yup.string()
              .max(10, 'Must be 10 characters or less')
              .min(5, 'Minimum 5 characters or less')
              .required('Please Enter Your Password'),
       
 })


export default RegistationValidation