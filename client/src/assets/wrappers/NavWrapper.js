import styled from 'styled-components'

const NavWrapper = styled.nav`
  flex: 0 0 150px;
  display: flex;
  gap: var(--size-xxs);
  justify-content: flex-end;
  position: relative;

  .user-menu,
  .notifications {
    position: absolute;
    width: 300px;
    background: var(--tint-100);
    padding: var(--size-xxs);
    top: var(--size-header);
    right: 0;
    flex-direction: column;
    gap: 3px;
    border-radius: var(--size-xxs);
    z-index: 10;
    box-shadow: 0 0 5px var(--tint-50);
  }

  .icon {
    width: 24px;
    height: 24px;
    color: var(--shade-20);
  }

  .user-btn {
    padding: var(--size-xxs) var(--size-s);
    display: flex;
    align-items: center;
    gap: 1rem;
    border: transparent;
    background: transparent;
    cursor: pointer;
    transition: var(--transition);
    border-radius: var(--size-xxs);
  }

  .user-btn:hover {
    background: var(--shade-20);
    color: var(--tint-90)
  }

  a {
    text-align: left;
    display: flex;
    gap: var(--size-xs);
    padding: 0 var(--size-xxs) 0 0;
  }

  .notification {
    text-transform: none;
  }

  .request-profile {
    padding: var(--size-xxs);
    border-radius: var(--size-xxs);
  }

  .request-profile:hover {
    background: var(--tint-80);
  }

  .notification img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .notification .name {
    font-weight: 700;
    color: var(--primary);
  }

  .btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--size-xxs);
    margin-top: var(--size-xxs);
  }

  .btn {
    border: 1px solid var(--shade-30);
  }

  a:hover {
    background: var(--tint-80);
  }

  @media (min-width: 900px) {
    
  }
`
export default NavWrapper