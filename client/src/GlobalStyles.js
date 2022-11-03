import { createGlobalStyle } from 'styled-components';
import { COLORS } from './constants';


const GlobalStyle = createGlobalStyle`
body {
    margin: 0;
    padding: 0px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    width: 1000px;
}

button {
    background-color: ${COLORS.primary};
    color: white;
    font-size: 1.1em;
    border-radius: 20px;
    border: none;
    padding: 8px;
    font-weight: 600;
}

button:hover {
    background-color: ${COLORS.hoverHighlight}
}

button:active {
    transform: scale(1.03);
}

.grey-text {
    color: grey;
}
`;

export default GlobalStyle;