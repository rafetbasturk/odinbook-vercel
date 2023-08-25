import styled from 'styled-components'

const SearchWrapper = styled.div`
  flex: 1 0 auto;
  max-width: 700px;
  position: relative;
  z-index: 10;

  .search-icon {
    position: absolute;
  }

  .search {
    background: var(--tint-90);
    border: transparent;
    height: 40px;
    border-radius: 20px;
    outline: transparent;
    width: 0;
    padding: 0;
  }

  .search::placeholder {
    font-size: var(--size-sm);
  }
  
  .show {
    padding: 0 1rem 0 4rem;
    width: 100%;
    min-width: 200px;
  }

  .content {
    background: var(--tint-100);
    border-radius: var(--size-xxs);
    padding: 2rem;
    margin-top: var(--size-s);
    display: none;
    box-shadow: 0 0 5px var(--tint-50);
  }

  .on {
    display: flex;
    flex-direction: column;
    ${'' /* gap: var(--size-xs); */}
    position: absolute;
    width: 100%;
    max-height: 400px;
    overflow-y: scroll;
  }
`
export default SearchWrapper