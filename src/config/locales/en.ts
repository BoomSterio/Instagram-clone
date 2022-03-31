import { RawLocalesList } from '.'

const messages: RawLocalesList = {
  login: {
    title: 'Login',
    userName: 'User name',
    password: 'Password',
    submit: 'Login',
    forgotPassword: 'Forgot password?',
  },
  passwordRecovery: {
    userEmail: 'E-mail',
    submit: 'Send E-mail',
    description: 'Please enter your e-mail address! You will receive an e-mail in order to create a new password.',
    haveAnAccount: 'Have an account?',
  },
  messages: {
    firstName: 'Please enter a valid name',
    lastName: 'Please enter a valid last name',
    nickname: 'Please enter a valid nickname',
    email: 'Please enter a valid email address',
    password: 'At least 8 characters',
    confirmEmail: 'Email must match',
    confirmPassword: 'Passwords do not match',
    required: 'This field is required',
    phone: 'Mobile number is not valid',
    address: 'Please enter a valid address',
    city: 'Please enter a valid city',
    suburb: 'Please enter a valid suburb',
    tagUsing: 'Cannot include < and >',
    number: 'Only digits',
    space: 'Cannot include leading and trailing spaces',
    passwordLeadingTrailing: 'Password cannot begin or end with a space',
    minLength: `Min length {length, number} characters`,
    maxLength: `Max length {length, number} characters`,
    exactLength: `Should be exactly {length, number} characters`,
  },
}

export default messages
