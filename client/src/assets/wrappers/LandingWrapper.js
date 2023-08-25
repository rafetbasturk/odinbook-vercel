import styled from 'styled-components'

const LandingWrapper = styled.main`
  padding: var(--size-l) var(--size-s);

  .top {
    display: flex;
    flex-direction: column;
  }

  .logo-container {
    width: 100%;
    max-width: 400px;
    margin: 0 auto var(--size-xl);
  }

  .logo {
    width: 250px;
    height: 120px;
    align-self: center;
  }

  a.logo {
    pointer-events: none;
  }

  h2 {
    font-weight: 400;
    text-align: left;
    text-transform: none;
    margin: var(--size-m) auto;
    text-align: justify;
  }

  p {
    text-align: justify;
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
    padding: 10rem 18rem;
    display: flex;
  }
`
export default LandingWrapper
