import { useState } from "react";
import { FaUserCircle, FaSignInAlt, FaFacebook } from "react-icons/fa";
import { FormWrapper } from "../assets/wrappers";
import { InputElement } from "../components";
import useAuthContext from "../hooks/useAuthContext";
import useAlert from "../hooks/useAlertContext";

const LoginForm = () => {
  const { showAlert } = useAlert();
  const { userLoading, login } = useAuthContext();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    isMember: true
  })

  const { name, email, password, confirm, isMember } = values;

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = e => {
    const { name, value } = e.target
    setValues(curr => {
      return {
        ...curr,
        [name]: value
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (!email || !password || (!isMember && !name) || (!isMember && !confirm)) {
      showAlert("danger", "Please provide all values!");
      return;
    }
    const currentUser = { name, email, password, confirm };

    let endPoint = isMember ? "login" : "register";

    login(currentUser, endPoint);
  }

  return (
    <FormWrapper>
      <form className="form" onSubmit={handleSubmit}>
        {!isMember ? <FaUserCircle className="icon form-icon" /> : <FaSignInAlt className="icon form-icon" />}

        <h3>{!isMember ? "register" : "login"}</h3>

        {!isMember && <InputElement type="name" name="name" value={name} handleChange={handleChange} />}

        <InputElement type="email" name="email" value={email} handleChange={handleChange} />

        <InputElement type="password" name="password" value={password} handleChange={handleChange} />

        {!isMember && <InputElement type="password" name="confirm" labelText="confirm password" value={confirm} handleChange={handleChange} />}

        <button type="submit" className="btn" disabled={userLoading}>
          {!isMember ? 'Register' : 'Login'}
        </button>

        <p>
          {isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='btn-member'>
            {isMember ? 'Register' : 'Login'}
          </button>
        </p>

        <div className="other-methods">
          <div className="line"></div>
          <p>Or continue with</p>
        </div>

        <a href="/api/v1/auth/facebook" className="link">
          <FaFacebook className="icon" />
        </a>
      </form>
    </FormWrapper>);
}

export default LoginForm
