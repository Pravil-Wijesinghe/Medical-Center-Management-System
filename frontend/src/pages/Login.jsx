import { Paper, Box, Typography, Grid, Button } from '@mui/material'
import backgroundImg from '../assets/login-bg-img.png';
import CustomTextField from '../components/CustomTextField';
import PrimaryButton from '../components/PrimaryButton';

function Login() {
  return (
    <Paper sx={{ width: '100%', height: '100vh', position: 'relative', padding: 10, display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
            width: '50%',
            height: '100%',
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: 20,
        }}
      />
      <Box
        sx={{
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 4,
        }}
      >
        <Typography sx={{ fontSize: 48, fontWeight: 600 }}>Welcome Back</Typography>
        <Typography color="grey" sx={{ fontSize: 16, fontWeight: 400, mt: 1 }} align="center">
            Please enter your credentials to log in to your account.
        </Typography>
        <form onSubmit={""}>
            <Grid
                container
                spacing={2}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    my: 3,
                }}
            >
                <Grid size={12}>
                    <CustomTextField
                        label="Username"
                        placeholder="Ex: JohnDoe1"
                        required={true}
                        name="username"
                        // value={formData.username}
                        // onChange={handleChange}
                        // error={!!errors.username}
                        // helperText={errors.username}
                    />
                </Grid>
                <Grid size={12}>
                    <CustomTextField
                        label="Password"
                        type="password"
                        placeholder="**********"
                        required={true}
                        name="password"
                        // value={formData.password}
                        // onChange={handleChange}
                        // error={!!errors.password}
                        // helperText={errors.password}
                    />
                </Grid>
                <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <PrimaryButton
                        type="submit"
                        fullWidth
                        // disabled={submitState.isLoading}
                        // onClick={handleSubmit}
                    >
                        {/* {submitState.isLoading ? <CircularProgress size={24} /> : 'Login'} */}
                        Login
                    </PrimaryButton>
                </Grid>
            </Grid>
        </form>
        <Box
            sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            mt: 0,
            }}
        >
            <Typography sx={{ fontSize: 16, fontWeight: 400 }} align="center">
                Don't have an account?
            </Typography>
            <Button href="/signup" variant="text" sx={{ textTransform: 'none' }}>create an Account</Button>
        </Box>
      </Box>
    </Paper>
  )
}

export default Login
