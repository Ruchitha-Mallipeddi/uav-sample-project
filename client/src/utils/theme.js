import { createMuiTheme } from "@material-ui/core/styles";

export const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#3a456b",
    },
    secondary: {
      main: "#ffffff",
    },
    myColor: {
      redColor: "#f10e41",
      blackColor: "#000",
      greenColor: "#3bb7ab",
      ashColor: "#eeeff0",
      lightBlack: "#101010e6",
    },
  },
  spacing: 8,
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
      fontSize: "20px",
      textAlign: "left",
      color: "#000",
      fontStyle: "bold",
      fontFamily: "poppins",
      thickness: "5px",
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
