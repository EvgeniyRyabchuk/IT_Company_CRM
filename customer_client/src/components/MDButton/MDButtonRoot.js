

// @mui material components
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export default styled(Button)(({ theme, ownerState }) => {
  const {palette, borders} = theme;
  const {color, variant, size, circular, iconOnly, darkMode} = ownerState;

  const {white, text, transparent, gradients, grey} = palette;

  // styles for the button with variant="contained"
  const containedStyles = () => {
    // background color value
    const backgroundValue = palette[color] ? palette[color].main : white.main;

    // backgroundColor value when button is focused
    const focusedBackgroundValue = palette[color] ? palette[color].focus : white.focus;

    // boxShadow value

    // color value
    let colorValue = white.main;

    if (!darkMode && (color === "white" || color === "light" || !palette[color])) {
      colorValue = text.main;
    } else if (darkMode && (color === "white" || color === "light" || !palette[color])) {
      colorValue = grey[600];
    }

    // color value when button is focused
    let focusedColorValue = white.main;

    if (color === "white") {
      focusedColorValue = text.main;
    } else if (color === "primary" || color === "error" || color === "dark") {
      focusedColorValue = white.main;
    }

    return {


      "&:disabled": {
        backgroundColor: backgroundValue,
        color: focusedColorValue,
      },
    };
  };

  // styles for the button with variant="outlined"
  const outliedStyles = () => {
    // background color value

    // color value
    const colorValue = palette[color] ? palette[color].main : white.main;


    return {


      "&:active:not(:hover)": {
        backgroundColor: colorValue,
        color: white.main,
        opacity: 0.85,
      },

      "&:disabled": {
        color: colorValue,
        borderColor: colorValue,
      },
    };
  };

  // styles for the button with variant="gradient"
  const gradientStyles = () => {
    // background value


    // color value
    let colorValue = white.main;

    if (color === "white") {
      colorValue = text.main;
    } else if (color === "light") {
      colorValue = gradients.dark.state;
    }


    // styles for the button with variant="text"
    const textStyles = () => {
      // color value
      const colorValue = palette[color] ? palette[color].main : white.main;

      // color value when button is focused
      const focusedColorValue = palette[color] ? palette[color].focus : white.focus;

      return {
        color: colorValue,

        "&:hover": {
          color: focusedColorValue,
        },

        "&:focus:not(:hover)": {
          color: focusedColorValue,
        },
      };
    };


    // styles for the button with iconOnly={true}
    const iconOnlyStyles = () => {
      // width, height, minWidth and minHeight values

      return {


        "& .material-icons": {
          marginTop: 0,
        },

        "&:hover, &:focus, &:active": {
          transform: "none",
        },
      };
    };

    return {
      ...(variant === "contained" && containedStyles()),
      ...(variant === "outlined" && outliedStyles()),
      ...(variant === "gradient" && gradientStyles()),
      ...(variant === "text" && textStyles()),
      ...(iconOnly && iconOnlyStyles()),
    };
  }
});
