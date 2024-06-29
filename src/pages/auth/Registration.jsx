import React, { useState } from 'react'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import InputBox from '../../component/utilities/InputBox';
import LoginImg from '../../assets/images/loginimg2.jpeg'
import Images from '../../component/utilities/Images';
import Paragraph from '../../component/utilities/Paragraph';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import RegistationValidation from '../../validation/RegistationValidation';
import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile  } from 'firebase/auth';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from "react-router-dom";




const LoginHeading = styled(Typography)({

  color: "#03014C",
  fontSize: "33px",
  marginBottom: "30px",
});


const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 20,
  padding: '26px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#5F34F5',
  borderColor: '#0063cc',
  width: "100%",
  marginTop: "50px",
  marginBottom: "40px",
});



const Registration = () => {
  const auth = getAuth();
  const db = getDatabase(); 
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();



 
   const initialValues = {
       fullName: '',
       email: '',
       password: '',
  }
   
  const formik = useFormik({
      initialValues: initialValues,
      validationSchema: RegistationValidation,
      onSubmit: (values,actions) => {

      setLoading(true)
      actions.resetForm();
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            updateProfile(auth.currentUser, {
             displayName: values.fullName,
            }).then(() => {  
            set(ref(db, 'users/' + userCredential.user.uid),{
            displayName: userCredential.user.displayName,
            email: userCredential.user.email,
            profile_picture : userCredential.user.photoURL, 
            }).then(()=>{
            console.log("Real Time DataBase Created");
              toast("Registration Successfully....");
              setLoading(false)
              setTimeout(()=>{
                navigate("/")
              },3000)
         });
         }).catch((error) => {
          console.log('Profile Picture Invalid');
          setLoading(false)
         });
         });
        }).catch((error) => {
             console.log(error);
             setLoading(false)
        });
       },
   });
  
  return (
    <>
    {loading &&
      <div className='loading_wrapper'>
        <ColorRing
            visible={true}
            height="120"
            width="120"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
      </div>
    }
   <Box sx={{ flexGrow: 1 }}>
       <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
      <Grid container spacing={0}>
        <Grid item xs={6} style={{display: "flex" , alignItems: "center" , justifyContent: "center"}}>
          <div>
          <LoginHeading variant="h5">
           Get Started With Easily Register
          </LoginHeading>
          <Paragraph styleing="regsubheading" text="Free Register And You Can Enjoy It"/>
          <form onSubmit={formik.handleSubmit}>
          <div className='logininputbox'>
          <div>
          <InputBox
                 name="email" 
                 type="email" 
                 id="email" 
                 values={formik.values.email} 
                 onChange={formik.handleChange}  
                 variant="outlined" 
                 placeholder="Email Address"  
                 styleing="emailbox" 
                />
                {formik.touched.email && formik.errors.email ? (
                   <p style={{color: "red"}}>{formik.errors.email}</p>
                ) : null}
          </div>
          <div>
          <InputBox 
                name="fullName" 
                type="text" 
                id="fullName" 
                values={formik.values.fullName} 
                onChange={formik.handleChange}
                variant="outlined" 
                placeholder="FullName"  
                styleing="emailbox" 
                />  
                {formik.touched.fullName && formik.errors.fullName ? (
                   <p style={{color: "red"}}>{formik.errors.fullName}</p>
                 ) : null}
          </div>
          <div>
          <InputBox 
                name="password" 
                type="password" 
                id="password" 
                values={formik.values.password} 
                onChange={formik.handleChange}
                variant="outlined" 
                placeholder="Enter Your Password" 
                styleing="passwordbox" 
                />
               {formik.touched.password && formik.errors.password ? (
                   <p style={{color: "red"}}>{formik.errors.password}</p>
                 ) : null}
          </div>
          <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label"name="row-radio-buttons-group">
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          </FormControl>
          </div>
          <BootstrapButton type='submit' variant="contained" disableRipple>
              Sign up
          </BootstrapButton>
          </form>
            <span style={{color: "#03014C", fontSize: "20px", fontWeight: "800"}}>Already have an account ? <Link to={"/" } style={{color: "#EA6C00",fontSize: "20px", fontWeight: "800"}}> Sign In </Link> </span>
          </div>
          
          </Grid>
          <Grid item xs={6}>
           <div style={{ width: "100%", height: "100vh" }}>
              <Images source={LoginImg} alt="cat" styleing="loginbigimg"/>
          </div>
        </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default Registration
