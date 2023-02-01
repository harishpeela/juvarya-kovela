import * as Yup from 'yup';

export const RegisterValidationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(3, 'Minimum 3 Characters required')
    .max(25, 'Maximum 25 Charachers Allow')
    .required('First Name is required'),
  lastName: Yup.string().trim().required('Last Name  is required'),
  phone: Yup.string().trim().required('phone number is required'),
  email: Yup.string()
    .email('Invalid Email Address')
    .required('Email is required'),
  password: Yup.string()
    .trim()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase and One Special Case Character',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Password not Matched'),
});
export const UpdatePasswordValidation = Yup.object({
  password: Yup.string().trim().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Password not Matched'),
});

export const AddTampleSchema = Yup.object({
  tampleName: Yup.string().trim().required('Tample Name is required'),
  description: Yup.string().trim().required('Description  is required'),
  // community: Yup.string().trim().required('Community is requires'),
});

export const AddEventSchema = Yup.object({
  eventName: Yup.string().required('Event Name is required'),
  description: Yup.string().trim().required('Description  is required'),
  // community: Yup.string().trim().required('you are not a admin to Add'),
});

export const AddTampleSchemaS2 = Yup.object({
  pinCode: Yup.string().trim().required('Pincode is required'),
  line1: Yup.string().trim().required('line1  is required'),
  line2: Yup.string().trim().required('line2 is required'),
  line3: Yup.string().trim().required('line3 is required'),
});
export const AddTampleSchemaS3 = Yup.object({
  // employeId: Yup.string().trim().required('employee Id is required'),
  employeId: Yup.string()
    .email('Invalid EmployeeId')
    .required('Employee id is required'),
});
export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid Email Address')
    .required('Email is required'),
  password: Yup.string().trim().required('Password is required'),
});
export const createPostScheme = Yup.object({
  caption: Yup.string().required('caption is required'),
});
