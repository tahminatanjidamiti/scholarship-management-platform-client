import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CheckoutFrom = () => {
    const { user, loading } = useAuth();
    const [hasPaid, setHasPaid] = useState(false);
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        photo: null,
        address: '',
        gender: '',
        degree: '',
        sscResult: '',
        hscResult: '',
        studyGap: '',
    });

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();

    const { data: scholarship = {}, isLoading: isScholarshipLoading } = useQuery({
        queryKey: ['scholarship-details', id],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/scholarships-details/${id}`);
            return res.data;
        },
    });

    useEffect(() => {
        if (user) {
            axiosSecure
                .get('/user-profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                })
                .then((res) => {
                    setUserId(res.data._id);
                })
                .catch((err) => {
                    console.error('Failed to fetch user profile:', err);
                });
        }
    }, [user, axiosSecure]);
    const scholarshipId = scholarship._id;

    useEffect(() => {
        if (userId && scholarshipId) {
            axiosSecure
                .get(`/payments/check/${userId}/${scholarshipId}`)
                .then((res) => {
                    setHasPaid(res.data.hasPaid);
                })
                .catch((err) => {
                    console.error('Failed to revalidate payment status:', err);
                });
        }
    }, [userId, scholarshipId, axiosSecure]);
    useEffect(() => {
        if (userId && scholarshipId) {
            axiosSecure
                .get(`/applications/check/${userId}/${scholarshipId}`)
                .then((res) => {
                    setFormSubmitted(res.data.formSubmitted);
                })
                .catch((err) => {
                   
                });
        }
    }, [userId, scholarshipId, axiosSecure]);

    const applicationFees = scholarship?.applicationFees;

    useEffect(() => {
        if (!isScholarshipLoading && applicationFees > 0 && !hasPaid) {
            axiosSecure
                .post('/create-payment-intent', { fees: applicationFees })
                .then((res) => {
                    if (res.data?.clientSecret) {
                        setClientSecret(res.data.clientSecret);
                    } else {
                        toast.error('Failed to fetch client secret');
                    }
                })
                .catch((err) => {
                    toast.error(`Payment initialization failed: ${err.message}`);
                });
        }
    }, [axiosSecure, applicationFees, isScholarshipLoading, hasPaid]);

    const handlePaymentSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            toast.error('Stripe has not loaded');
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            toast.error('Card Element is not loaded');
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            toast.error(error.message);
            return;
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            toast.error(confirmError.message);
        } else if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            const payment = {
                email: user.email,
                userId,
                fees: applicationFees,
                transactionId: paymentIntent.id,
                date: new Date().toLocaleString(),
                scholarshipId,
            };

            const res = await axiosSecure.post('/payments', payment);
            if (res.data?.paymentResult?.insertedId) {
                setHasPaid(true);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Payment successful! Please fill out the application form.',
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (formData.photo) {
            const formDataForImage = new FormData();
            formDataForImage.append('image', formData.photo);

            try {
                const imgRes = await fetch(image_hosting_api, {
                    method: 'POST',
                    body: formDataForImage,
                });
                const imgData = await imgRes.json();

                if (imgData.success) {
                    const options = {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                    };

                    const applicationData = {
                        ...formData,
                        photo: imgData.data.display_url,
                        userName: user?.displayName,
                        userEmail: user?.email,
                        userId,
                        scholarshipId,
                        currentDate: new Date().toLocaleString('en-US', options),
                        scholarshipDeadline: scholarship?.scholarshipDeadline,
                        universityName: scholarship?.universityName,
                        universityCity: scholarship?.universityCity,
                        universityCountry: scholarship?.universityCountry,
                        scholarshipCategory: scholarship?.scholarshipCategory,
                        scholarshipName: scholarship?.scholarshipName,
                        subjectCategory: scholarship?.subjectCategory,
                        serviceCharge: scholarship?.serviceCharge,
                        applicationFees: scholarship?.applicationFees,
                        status: "Pending",
                        feedback: "N/A"
                    };

                    const res = await axiosSecure.post('/applications', applicationData);
                    if (res.data?.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Application submitted successfully!',
                            showConfirmButton: false,
                            timer: 1500,
                        });
                        setFormSubmitted(true);
                        
                    } else {
                        toast.error('Failed to submit application.');
                    }
                } else {
                    toast.error('Failed to upload photo.');
                }
            } catch (err) {
                toast.error('Error uploading photo.');
                console.error(err);
            }
        } else {
            toast.error('Please upload a photo.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
    };

    return (
        <div className="p-4 mb-5 border-2 border-gray-300 rounded-lg">
            <h2 className="text-center text-2xl font-bold mb-4">Initial Process for Scholarship Applications...</h2>
            {isScholarshipLoading ? (
                <p>Loading scholarship details...</p>
            ) : (
                <>
                    {!transactionId && !hasPaid ? (
                        <form onSubmit={handlePaymentSubmit} className="space-y-4">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#424770',
                                            '::placeholder': {
                                                color: '#aab7c4',
                                            },
                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                            <button
                                className="btn btn-sm btn-info my-4 w-full"
                                type="submit"
                                disabled={!stripe || !clientSecret || hasPaid} 
                            >
                                Pay ${applicationFees || 0}
                            </button>
                            <p className="text-red-600">{error}</p>
                        </form>
                    ) : !formSubmitted ? (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block">Phone Number:</label>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    required
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block">Photo:</label>
                                <input
                                    type="file"
                                    name="photo"
                                    required
                                    onChange={handleFileChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block">Address:</label>
                                <input
                                    type="text"
                                    placeholder="village, district, country"
                                    name="address"
                                    required
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block">Gender:</label>
                                <select
                                    name="gender"
                                    required
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block">Degree:</label>
                                <select
                                    name="degree"
                                    required
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                >
                                    <option value="">Select Degree</option>
                                    <option value="Diploma">Diploma</option>
                                    <option value="Bachelor">Bachelor</option>
                                    <option value="Masters">Masters</option>
                                </select>
                            </div>
                            <div>
                                <label className="block">SSC Result:</label>
                                <input
                                    type="text"
                                    name="sscResult"
                                    required
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block">HSC Result:</label>
                                <input
                                    type="text"
                                    name="hscResult"
                                    required
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                />
                            </div>
                            <div>
                                <label className="block">Study Gap:</label>
                                <select
                                    name="studyGap"
                                    onChange={handleInputChange}
                                    className="border p-2 w-full"
                                >
                                    <option value="">No Gap</option>
                                    <option value="1 Year">1 Year</option>
                                    <option value="2 Years">2 Years</option>
                                    <option value="More than 2 Years">More than 2 Years</option>
                                </select>
                            </div>
                            <div>
                                <label className="block">University Name:</label>
                                <input
                                    type="text"
                                    value={scholarship?.universityName || ''}
                                    readOnly
                                    className="border p-2 w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block">Scholarship Category:</label>
                                <input
                                    type="text"
                                    value={scholarship?.scholarshipCategory || ''}
                                    readOnly
                                    className="border p-2 w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block">Subject Category:</label>
                                <input
                                    type="text"
                                    value={scholarship?.subjectCategory || ''}
                                    readOnly
                                    className="border p-2 w-full bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-success w-full p-2"
                               >
                                Submit Application
                            </button>
                        </form>
                    ) : (
                        <p>Application has been successfully submitted for this Scholarship.</p>
                    )}
                </>
            )}
        </div>
    );
};


export default CheckoutFrom;