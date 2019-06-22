import styled, { css } from 'styled-components';

const backgroundCSS = props => {
    const color1 = props.dark ? '#242424' : '#fff';
    const color2 = props.dark ? '#595959' : '#efefef';

    return css`
        background-color: ${color1};
        background-image: linear-gradient(
                45deg,
                ${color2} 25%,
                transparent 25%,
                transparent 75%,
                ${color2} 75%,
                ${color2}
            ),
            linear-gradient(
                45deg,
                ${color2} 25%,
                transparent 25%,
                transparent 75%,
                ${color2} 75%,
                ${color2}
            );
        background-position: 0 0, 10px 10px;
        background-size: 20px 20px;
    `;
};

export default styled.div`
    ${backgroundCSS}
`;
