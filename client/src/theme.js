import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

export const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#3a456b", // We can directly give colors in # without importing.
    },
    secondary: {
      main: "#ffffff",
    },
    myColor: {
      redColor: "#f10e41",
      blackColor: "#000",
      greenColor: "#3bb7ab",
      ashColor:"#eeeff0",
    },
  },
  typography: {
    h2: {
      fontSize: "40px",
      textAlign: "center",
      color: "#FFF",
      fontStyle: "bold",
      fontFamily: "poppins",
    },
     
    h5: {
      fontSize: "20px",
      
      color: "#fff",
      fontStyle: "bold",
      fontFamily: "poppins",
    },
    h6: {
      fontSize: "19px",
      textAlign: "left",
      color: "#000",
      fontStyle: "bold",
      fontFamily: "poppins",
    },
    button: {
      fontSize: "13px",
      textAlign: "center",
      color: "#fff",
      fontStyle: "bold",
      fontFamily: "poppins",
      fontWeight: "10px",
    },

    
  },
});