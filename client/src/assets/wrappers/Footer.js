import styled from 'styled-components'

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--size-xs);
  width: 100%;
  height: 6rem;
  max-width: 1440px;
  margin: auto;
  position: fixed;
  bottom: 0;
  background: var(--shade-70);
  font-size: 1.5rem;
  text-align: center;
  color: var(--tint-40);

  a {
    font-size: var(--size-m);
    color: var(--tint-80);
    display: block;
  }

  a:hover {
    background: transparent;
    padding-left: 0;
    transform: scale(1.03) rotateX(30deg);
    color: var(--tint-100);
  }
`

export default Wrapper