import styled from 'styled-components'

const Wrapper = styled.header`
  height: var(--size-header);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--size-l);
  box-shadow: 0 1px 0px 0px var(--tint-50);
  padding: 0 1.6rem;
  background: var(--tint-100);
  position: sticky;
  top: 0;
  z-index: 10;

  a.logo {
    padding: 0;
    background: transparent;
    flex: 0 0 150px;
  }

`
export default Wrapper