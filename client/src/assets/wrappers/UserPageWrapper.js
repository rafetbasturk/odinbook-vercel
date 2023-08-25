import styled from 'styled-components';

const UserPageWrapper = styled.main`
  padding: var(--size-l) var(--size-m);
  width: 100%;
  max-width: 700px;
  margin: var(--size-l) auto;
  background: var(--tint-100);
  border-radius: var(--size-xxs);

  img {
    width: 100px;
    height: 100px;
  }

  @media (min-width: 900px) {
    margin-top: 5rem;
  }
`
export default UserPageWrapper