import { createUser } from "@/api/UserAPI";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import * as Yup from 'yup';

interface UsernameFormProps {
    setFirstSignIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsernameForm = ({ setFirstSignIn }: UsernameFormProps) => {
    const { user } = useUser();

    if (!user?.sub)
        return <div>Error - No user found</div>;

    const initialValues = {   
        _id: '',
        userId: user.sub,
        username: ''
    };

    const handleSubmit = async (values: IUser) => {
        try {
            await createUser(values);
            toast.success(`Successfully set username to ${values.username}`);
            setFirstSignIn(false);
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required'),
    });
        
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    dirty
                } = props;
                return (
                    <Form>
                        <h2>You're new here! Please set a username</h2>
                        <label htmlFor="username">Username</label>
                        <input 
                            id="username" 
                            name="username" 
                            placeholder='Username'
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <p>
                            {touched.username && errors.username}
                        </p>
                        <button 
                            type='submit'
                            disabled={!dirty || isSubmitting}
                        >
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default UsernameForm;