import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Social Group
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  //Form Control
  const [formData, setFormdata] = React.useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    password: "",
    occupation: "",
    worksAt: "",
    workingLocation: "",
    aboutSelf: ""
  });
  const [pictureFile, setFile] = React.useState(null);

  const handleChange = (evt) => {
    const changeField = evt.target.name;
    const changeValue = evt.target.value;
    formData[changeField] = changeValue;

    setFormdata({ ...formData });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormdata({ ...formData });
    const newFormdata = {
      ...formData,
      picturePath: picturePath,
      picture: pictureFile[0],
    };
    console.log(newFormdata);


    const formValues = new FormData(); //FormData is used because multer doesn't work with json type form data, it needs multipart form data which FormData provides
    for (let keys in newFormdata) {
      formValues.append(keys, newFormdata[keys]);
    }
    // Object.keys(newFormdata).forEach(key=> formValues.append(key,newFormdata[key]));

    console.log(formValues);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {

        method: "POST",
        body: formValues
      }
    );

    const savedUser = await savedUserResponse.json();
    console.log(savedUser);
    navigate('/');
  };

  //DropZone for profilePicture
  const { acceptedFiles } = useDropzone();

  const [picturePath, setPicturePath] = React.useState("");
  const handleProfilePicture = async (file) => {
    setFile(file);

    setPicturePath(file[0].path);


  };


  const navigate = useNavigate();

  const LoginpageNavigate = () => {
    navigate('/');
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={handleChange}
                  value={formData.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={handleChange}
                  value={formData.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  label="location"
                  name="location"
                  autoComplete="location"
                  onChange={handleChange}
                  value={formData.location}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="occupation"
                  label="occupation"
                  name="occupation"
                  autoComplete="occupation"
                  onChange={handleChange}
                  value={formData.occupation}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="worksAt"
                  label="Work at"
                  name="worksAt"
                  autoComplete="worksAt"
                  onChange={handleChange}
                  value={formData.worksAt}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="workingLocation"
                  label="Working Location"
                  name="workingLocation"
                  autoComplete="workingLocation"
                  onChange={handleChange}
                  value={formData.workingLocation}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="aboutSelf"
                  label="Describe yourself"
                  multiline
                  rows={4}
                  name="aboutSelf"
                 
                  style={{width:'100%'}}
                  onChange={handleChange}
                  value={formData.aboutSelf}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                  value={formData.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleChange}
                  value={formData.password}
                />
              </Grid>

              <Grid item xs={12}>
                <Box
                  gridColumn="span 1"
                  border={`1px solid gray`}
                  borderRadius="5px"
                  p="1rem"
                  cursor="pointer"
                >
                  <Dropzone
                    name="picture"
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={handleProfilePicture}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <Box
                          border={`2px dashed gray`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          {!picturePath ? (
                            <p>Add Picture Here</p>
                          ) : (
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography>{picturePath}</Typography>
                              <EditOutlinedIcon />
                            </Box>
                          )}
                        </Box>
                      </section>
                    )}
                  </Dropzone>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={LoginpageNavigate} variant="body2" style={{ cursor: 'pointer' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
