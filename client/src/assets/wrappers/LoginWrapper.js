import styled from 'styled-components'

const LoginWrapper = styled.main`
  padding: var(--size-l) var(--size-s);

  .logo-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto var(--size-xl);
  }

  .logo {
    width: 250px;
    height: 120px;
    margin: auto;
  }

  a.logo {
    pointer-events: none;
  }

  h2 {
    font-weight: 400;
    text-align: left;
    text-transform: none;
    margin: var(--size-m) auto;
  }

  .landing {
    max-width: 600px;
    margin: 3rem auto 0;
  }

  .btn {
    width: 100%;
    margin-top: var(--size-xxs);
  }

  @media (min-width: 900px) {
    padding: 10rem;
    display: flex;

    .logo-container {
      display: flex;
      flex-direction: column;
      padding-top: 15rem;
      max-width: 50%;
    }

    .logo {
      margin: 0;
    }
  }

  @media (min-width: 1200px) {
    padding: 10rem 20rem;
  }
`
export default LoginWrapper
