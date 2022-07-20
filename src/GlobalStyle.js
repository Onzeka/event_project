import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    :root{
        --maxWidth: 1280px;
        --white: #fff;
        --lightGrey: #eeeeee;
    }

    *{
        box-sizing: border-box;
    }

    body{
        margin: 0;
        padding: 0;
    }

`