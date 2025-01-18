import { createTheme } from "@mui/material/styles";

const Navbartheme  = createTheme({
    palette: {
        primary: {
            main: "#000000",
        }, 
        secondary: {
            main: "#0000ff",
        },
        text: {
            primary: "#ffffff",
            secondary: "#0000ff",
        },
    },  
    // typography: {
    //     fontFamily: Roboto,
    // },
    components: {
        MuiToolbar:{
            styleOverrides: {
                
            },
        },
    },

});

export default Navbartheme;