import styled from 'styled-components'

const HomeWrapper = styled.main`
  padding: var(--size-l) var(--size-m);
  display: flex;
  flex-direction: column;
  gap: var(--size-ml);

  .post-form,
  .post {
    width: 100%;
    max-width: 700px;
    margin: auto;
    padding: var(--size-m);
    border-radius: var(--size-xxs);
    box-shadow: 0 0 1px 1px var(--tint-70);
    background: var(--tint-100);
    word-break: break-all;
  }

  .post-form a {
    align-self: flex-start;
    padding: 0;
    background: transparent;
  }

  .request {
    margin-top: var(--size-m);
    background: var(--tint-90);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--size-s);
    border-radius: var(--size-s);
  }

  .request .btns {
    flex-grow: 0;
    display: flex;
    gap: var(--size-xs);
  }

  .request .btns button {
    border: 1px solid var(--shade-40);
  }

  .user-page-top {
    padding: var(--size-l) var(--size-m);
    background: var(--tint-100);
    width: 100%;
    max-width: 700px;
    margin: var(--size-l) auto 0;
    border-radius: var(--size-xxs);
  }

  .profile-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .profile-container .profile-info {
    justify-content: center;
    gap: var(--size-m);
  }

  .profile-container img {
    width: 100px;
    height: 100px;
  }

  .profile-container .name {
    font-size: var(--size-xl);
    color: var(--shade-80);
  }

  .profile {
    display: flex;
    align-items: stretch;
    gap: var(--size-s);
  }

  .profile-container .btn {
    padding: var(--size-xs) var(--size-s);
    background: var(--tint-70);
  }

  .profile-container .btn:hover {
    padding-left: var(--size-s);
    background: var(--shade-20);
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .counts,
  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--size-s);
  }

  .like-counts {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .like-counts .icon {
    border-radius: 50%;
    color: var(--tint-100);
    background: var(--shade-20);
    padding: 3px;
  }

  .comment-counts {
    margin-left: auto;
  }

  .buttons button {
    flex-basis: 50%;
  }

  button {
    display: flex;
    gap: var(--size-xxs);
    align-items: center;
    justify-content: center;
    background: transparent;
    border-radius: var(--size-xxs);
    border: transparent;
    transition: var(--transition);
    text-transform: capitalize;
    padding: var(--size-xxs);
    cursor: pointer;
  }

  button:hover {
    background: var(--shade-20);
    color: var(--tint-90)
  }

  button:hover .icon {
    color: var(--tint-90)
  }

  .icon {
    width: 20px;
    height: 20px;
    color: var(--shade-20);
    transition: var(--transition);
  }

  label {
    display: none;
  }

  .comments {
    display: flex;
    flex-direction: column;
    gap: var(--size-m);
  }

  .post-form img,
  .comments img {
    width: 32px;
    height: 32px;
  }

  .post-form button {
    border-radius: 16px;
    border: 1px solid var(--tint-70);
  }

  .post-form button:hover {
    border: 1px solid transparent;
  }

  .comment {
    display: grid;
    grid-template-columns: 32px 1fr 40px;
    grid-template-rows: auto;
    gap: var(--size-xs);
    position: relative;
  }

  .comment a {
    padding: 0;
    background: transparent;
  }

  .comment-content {
    padding: var(--size-xxs) var(--size-s);
    background: var(--tint-90);
    border-radius: var(--size-m);
  }

  .comment-author {
    font-size: var(--size-s);
    font-weight: 700;
    color: var(--shade-40);
  }

  .comment-date {
    font-size: var(--size-xs);
    margin-right: var(--size-xs);
    text-align: right;
  }

  .comment-post {
    line-height: var(--size-ml);
  }

  .comment-menu {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    padding: var(--size-xxs);
    border-radius: 50%;
  }
  
  .comment-menu:hover {
    background: var(--tint-90);
  }

  .comment-options {
    position: absolute;
    right: 0;
    bottom: -100%;
    z-index: 10;
    background: var(--tint-100);
    padding: var(--size-xxs);
    border-radius: var(--size-xxs);
    box-shadow: 0 0 2px var(--tint-30), 0 0 10px var(--tint-60);
    display: flex;
    flex-direction: column;
    gap: var(--size-xxs);
    width: 120px;
  }

  .comment-options button {
    justify-content: stretch;
  }

  .post-form,
  .comment-form {
    display: flex;
    gap: var(--size-xxs);
    position: relative;
  }

  .textarea {
    background: var(--tint-90);
    border: 1px solid transparent;
    outline: 1px solid transparent;
    border-radius: 16px;
    color: var(--shade-50);
    resize: none;
    flex: 1 0 auto;
  }

  .post-form .textarea {
    padding: var(--size-s);
    height: 120px;
  }
  
  .comment-form .textarea {
    padding: var(--size-xxs) var(--size-s);
    height: 32px;
  }

  .comment-form .open {
    height: 64px;
    padding-right: var(--size-xl);
    padding-bottom: var(--size-xl);
  }

  .submit {
    position: absolute;
    background: transparent;
    bottom: var(--size-xxs);
    right: var(--size-xxs);
    display: none;
    align-items: center;
    padding: 3px;
  }

  .profile-container button:disabled {
    cursor: default;
  }

  button:disabled {
    cursor: not-allowed;
  }

  button:disabled:hover {
    opacity: .8;
    color: var(--tint-80);
  }

  button:disabled .icon {
    color: var(--tint-40);
  }

  .show {
    display: flex;
  }

  @media (min-width: 900px) {
    
  }
`
export default HomeWrapper