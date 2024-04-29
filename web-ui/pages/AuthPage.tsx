import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { KeyIcon, UserIcon } from '@heroicons/react/24/outline';
import { Button, Card, Input, Typography } from '@material-tailwind/react';
import { useUserQuery } from '@ui/hooks';
import { authService } from '@ui/services';

export const AuthPage: Component = () => {
    const navigate = useNavigate();
    const [isSignup, setIsSignup] = useState<boolean>(false);

    const {
        info: { refetch }
    } = useUserQuery();

    const login = useMutation({
        mutationKey: ['login'],
        mutationFn: (data: LoginFormData) => authService.login(data)
    });
    const signup = useMutation({
        mutationKey: ['signup'],
        mutationFn: (data: SignupFormData) => authService.signup(data)
    });

    const { register: registerLogin, handleSubmit: handleSubmitLogin } = useForm<LoginFormData>();
    const submitLogin = async (data: LoginFormData) => {
        try {
            await login.mutateAsync(data);
            await refetch();
            toast.success('Login successfully!');
            navigate('/chat');
        } catch (err) {
            const errorMessage = (err as ResponseError).message;
            toast.error(errorMessage);
        }
    };

    const { register: registerSignup, handleSubmit: handleSubmitSignup, reset: resetSignup } = useForm<SignupFormData>();
    const submitSignup = async (data: SignupFormData) => {
        try {
            await toast.promise(signup.mutateAsync(data), {
                pending: 'Registration request is pending',
                success: {
                    render() {
                        setIsSignup(false);
                        resetSignup();
                        return 'Sign up successfully. Please log in!';
                    }
                },
                error: 'Sign up failed!'
            });
        } catch (err) {
            const errorMessage = (err as ResponseError).message;
            toast.error(errorMessage);
        }
    };

    if (isSignup === false) {
        return (
            <Card color='transparent' shadow={false}>
                <Typography variant='h4' color='blue-gray'>
                    Login
                </Typography>
                <Typography color='gray' className='mt-1 font-normal'>
                    Enter your email and password.
                </Typography>
                <form className='mt-8 mb-2 w-72 md:w-80 max-w-screen-lg' onSubmit={handleSubmitLogin(submitLogin)}>
                    <div className='mb-4 flex flex-col gap-6'>
                        <Input
                            id='auth-email'
                            type='email'
                            size='lg'
                            label='Email'
                            icon={<UserIcon />}
                            {...registerLogin('email', {
                                required: true,
                                minLength: 5
                            })}
                            crossOrigin=''
                        />
                        <Input
                            id='auth-password'
                            type='password'
                            size='lg'
                            icon={<KeyIcon />}
                            label='Password'
                            {...registerLogin('password', {
                                required: true,
                                minLength: 8
                            })}
                            crossOrigin=''
                        />
                    </div>
                    <Button className='mt-6 bg-pink-500' fullWidth type='submit'>
                        Login
                    </Button>
                </form>
                <Typography color='gray' className='flex items-center justify-center gap-2 mt-4 text-center font-normal'>
                    Do not have an account?{' '}
                    <span className='font-medium text-gray-900 cursor-pointer' onClick={() => setIsSignup(true)}>
                        Sign Up
                    </span>
                </Typography>
            </Card>
        );
    } else {
        return (
            <Card color='transparent' shadow={false}>
                <Typography variant='h4' color='blue-gray'>
                    Sign Up
                </Typography>
                <Typography color='gray' className='mt-1 font-normal'>
                    Nice to meet you! Enter your details to register.
                </Typography>
                <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96' onSubmit={handleSubmitSignup(submitSignup)}>
                    <div className='mb-1 flex flex-col gap-6'>
                        <Input
                            size='lg'
                            label='Full Name'
                            icon={<UserIcon />}
                            {...registerSignup('name', {
                                required: true
                            })}
                            crossOrigin=''
                        />
                        <Input
                            size='lg'
                            label='Email'
                            type='email'
                            icon={<UserIcon />}
                            {...registerSignup('email', {
                                required: true,
                                minLength: 5
                            })}
                            crossOrigin=''
                        />
                        <Input
                            type='password'
                            size='lg'
                            label='Password'
                            icon={<KeyIcon />}
                            {...registerSignup('password', {
                                required: true,
                                minLength: 8
                            })}
                            crossOrigin=''
                        />
                    </div>
                    <Button className='mt-6 bg-pink-500' fullWidth type='submit'>
                        sign up
                    </Button>
                    <Typography color='gray' className='flex items-center justify-center gap-2 mt-4 text-center font-normal'>
                        Already have an account?{' '}
                        <span className='font-medium text-gray-900 cursor-pointer' onClick={() => setIsSignup(false)}>
                            Sign In
                        </span>
                    </Typography>
                </form>
            </Card>
        );
    }
};
