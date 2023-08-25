import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 0 50%;

  h3 {
    margin: var(--size-m);
  }

  .other-methods {
    position: relative;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .other-methods p {
    margin: 0;
    padding: 0 var(--size-xs);
    background: var(--tint-100);
    position: absolute;
    text-align: center;
  }

  .line {
    width: 100%;
    border-top: 1px solid var(--tint-60);
  }

  .icon {
    width: 32px;
    height: 32px;
    color: #1977F2;
  }

  .form-icon {
    color: var(--shade-20);
    align-self: center;
  }

  .link {
    padding: 0 var(--size-xxs);
    width: 100px;
    margin: auto;
  }

  .link:hover {
    padding: 0;
    background: transparent;
  }

  .link:hover .icon {
    transform: scale(1.1);
  }


  @media (min-width: 900px) {
    padding: var(--size-l);
  }
`
export default Wrapper