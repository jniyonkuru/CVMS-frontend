import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({


  cssVariables: true,
  typography: {
    fontFamily: " 'Poppins' , 'Roboto', 'Arial', sans-serif",
    fontWeightLight: 100,
    fontSize: 12,
  },
  palette: {
    primary: {
      main: '#1E4854',
      light:'#22755b',
      contrastText:'#152625'
    },
    secondary: {
      main: '#757575',
      light:'#b9d9cc'
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides:{
        root:{
          color:"primary.light"
        }
      }
    },

    MuiOutlinedInput:{
      styleOverrides:{
      root:{
        '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: '0.5px', // Set thinner border width
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px', // Optional: keep it thin on hover
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px', // Optional: keep it thin on focus
          },
      }
      }
    }
  },

});

export default theme;