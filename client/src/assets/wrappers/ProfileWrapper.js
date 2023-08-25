import styled from 'styled-components';

const ProfileWrapper = styled.main`
  padding: var(--size-l) var(--size-m);
  width: 100%;
  max-width: 1200px;
  margin: var(--size-l) auto;

  .container {
    display: flex;
    flex-direction: column;
    gap: var(--size-m);
  }

  .image-upload,
  .info {
    background: var(--tint-100);
    padding: var(--size-m) var(--size-s);
    border-radius: var(--size-xxs);
  }

  .image-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--size-s);
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  svg {
    width: 32px;
    height: 32px;
  }

  .file-form {
    display: flex;
    align-items: center;
  }

  input[type=file] {
    width: 100%;
    cursor: pointer;
  }

  input[type=file]::file-selector-button {
    display: none;
  }
  
  .label {
    border-bottom: none;
    cursor: pointer;
  }

  .label-span {
    display: flex;
    align-items: center;
    gap: var(--size-m);
  }


  @media (min-width: 900px) {
    margin-top: 5rem;

    .container {
      flex-direction: row;
    }

    .image-upload {
      max-width: 400px;
    }

    .image-upload,
    .info {
      padding: var(--size-m);
      flex: 1 0 50%;
    }
  }
`
export default ProfileWrapper