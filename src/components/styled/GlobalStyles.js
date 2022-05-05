import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
    /* Box sizing rules */
    *,
    *::before,
    *::after {
        box-sizing: border-box; 
    }

    
a:not([class]) {
    text-decoration-skip-ink: auto;
}


/* Remove default margin */
body,
h1,
h2,
h3,
h4,
h5,
p{
    margin: 0;      
}

    /* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul,
ol{
    margin-left: 0; 
    padding-left: 0; 
    list-style: none;   
}

/* Set core root defaults */
html:focus-within {
    scroll-behavior: smooth;    
}



    body{
        text-rendering: optimizeSpeed;
        position: relative;
        font-family: 'Kumbh Sans', sans-serif;
    }
    /* Make images easier to work with */
    img,
    picture {
        max-width: 100%;
        display: block;
    }

    /* Inherit fonts for inputs and buttons */
    input,
    button,
    textarea,
    select {
        font: inherit;
    }
    
    a {
        color: inherit;
        text-decoration: inherit; /* no underline */
    }

    /* Accessability */
    @media (prefers-reduced-motion: reduce) {
    html:focus-within {
        scroll-behavior: auto;
    }
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

`

export default GlobalStyles
