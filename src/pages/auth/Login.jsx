import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import LoginwithGoogle from '../../assets/images/loginwithgoogle.webp'
import LoginImg from '../../assets/images/loginimg.webp'
import Images from '../../component/utilities/Images';
import InputBox from '../../component/utilities/InputBox';
import Button from '@mui/material/Button';
import "./auth.css"
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import LoginValidation from '../../validation/LoginValidation';
import Modal from '@mui/material/Modal';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup   } from "firebase/auth";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { ThreeDots } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux'







const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const LoginHeading = styled(Typography)({

  color: "#03014C",
  fontSize: "33px",
  marginBottom: "30px",
})

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

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const navigate = useNavigate();
    const [loader , setLoader] = useState(false)
    const auth = getAuth();
    const [forgetemail, setforgetemail] = useState("");
    const provider = new GoogleAuthProvider();
    const  dispatch = useDispatch()



  const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const initialValues = {
       email: '',
       password: '',
  }
   
const formik = useFormik({
     initialValues: initialValues,
     validationSchema: LoginValidation,
     onSubmit: (values,actions) => {
      console.log(values);
       setLoader(true)
          signInWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
              const user = userCredential.user;
              localStorage.setItem("loginUser", JSON.stringify(user))
              if(user.emailVerified){
                console.log(user);
                navigate("/home")
                       setLoader(false)
              }else{
                toast("Please Verify Your Email..");
                       setLoader(false)
              }
            })
            .catch((error) => {
              console.log(error);
              toast("Invalid Credential..");
               setTimeout(()=>{
                 setLoader(false)
              },2000)
            });

              },
            });
            let handleForgetpassword = () => {
              console.log(forgetemail);
              sendPasswordResetEmail(auth, email)
              .then(() => {
                toast("Email Message Sent Done ")
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
            }

            let handleGoogleLogin = () => {
            signInWithPopup(auth, provider)
              .then((result) => {
                const user = result.user;
                navigate("/home")
                  localStorage.setItem("loginUser", JSON.stringify(user))
                console.log(user);
              }).catch((error) => {
                console.log(error);
              
              });
             }
          

 return (
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
                   Login to your account!
               </LoginHeading>
          <Images onClick={handleGoogleLogin} source={LoginwithGoogle} alt="google" google styleing="LoginwithGoogle"/>
          <form onSubmit={formik.handleSubmit}> 
          <div className='logininputbox'>
          <InputBox 
                 name="email" 
                 type="email" 
                 id="email" 
                 values={formik.values.email} 
                 onChange={formik.handleChange} 
                 variant="standard" 
                 placeholder="Email Address"  
                 styleing="emailbox"
                 />
                 {formik.touched.email && formik.errors.email ? (
                   <p style={{color: "red"}}>{formik.errors.email}</p>
                 ) : null}
          <InputBox  
                 name="password" 
                 type="password"  
                 id="password" 
                 values={formik.values.password} 
                 onChange={formik.handleChange}  
                 variant="standard" 
                 placeholder="Enter Your Password" 
                 styleing="passwordbox"/>
                  {formik.touched.password && formik.errors.password ? (
                   <p style={{color: "red"}}>{formik.errors.password}</p>
                 ) : null}
          </div>
          <BootstrapButton disabled={loader} type='submit' variant="contained" disableRipple> 
            {loader ?
                <ThreeDots
                visible={true}
                height="40"
                width="80"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
                :
                "Login to Continue"
               }   
             </BootstrapButton>
            </form>
            <span style={{color: "#03014C", fontSize: "20px", fontWeight: "800"}}>Don't have an account ? <Link to={"/registration" } style={{color: "#EA6C00",fontSize: "20px", fontWeight: "800"}}> Sign Up </Link></span>
            <p  onClick={handleOpen}>Forget Password?</p>
          </div>
        </Grid>
        <Grid item xs={6}>
           <div style={{ width: "100%", height: "100vh" }}>
              <Images source={LoginImg} alt="#" styleing="loginbigimg"/>
          </div>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <h1 style={{ textAlign: "center", marginBottom: "15px",  }}>Forget Password</h1>
          <div>
            <InputBox 
                 name="email" 
                 type="forgetemail" 
                 id="forgetemail" 
                 variant="outlined" 
                 placeholder="Forget Email Address"  
                 styleing="emailbox"
                 onChange={ (e)=> setforgetemail(e.target.value) }
                 />
                  <BootstrapButton style={{color: "fff",fontSize: "20px", fontWeight: "800",}} onClick={handleForgetpassword} type='submit' variant="contained" disableRipple>
                            Rest Password
                  </BootstrapButton>
                  <button style={{height: "50px", width: "100px", color: "white", fontSize: "20px", fontWeight: "600",  border: "2px", background: "Black", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "110px", }} onClick={() => setOpen(false) }>Close</button>
              </div>
           </Box>
        </Modal>
     </Box>
   )
}

export default Login
