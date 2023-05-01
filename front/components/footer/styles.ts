import styled from 'styled-components';

const Wrapper = styled.div`
  width: 30vw;
  min-width: 200px;
  padding-left: var(--padding-size-m);
  padding-bottom: var(--padding-size-m);
  color: var(--color-gray);

  & a {
    color: var(--color-gray);
    text-decoration: underline;
  }

  & a:hover {
    color: var(--color-secondary);
  }
`;

export default Wrapper;
