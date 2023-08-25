import styled from 'styled-components'

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--tint-90);
  color: var(--shade-60);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--size-ml);
  position: relative;
  cursor: pointer;

  .notification {
    transform: rotate(-10deg);
  }

  img {
    border-radius: 50%;
  }

  .down,
  .count {
    width: var(--size-sm);
    height: var(--size-sm);
    border-radius: 50%;
    position: absolute;
  }
  
  .down {
    background: var(--tint-90);
    bottom: 0;
    right: 0;
  }

  .count {
    display: grid;
    place-content: center;
    background: var(--clr-alert-light);
    color: var(--shade-100);
    font-size: var(--size-xs);
    top: 0;
    right: 0;
  }
`
export default IconWrapper