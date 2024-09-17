'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setShippingInfo } from '../../store/cartSlice';
import { useRouter } from 'next/navigation';

const ShippingSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
    address: Yup.string().required('Address is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

const PaymentSchema = Yup.object().shape({
    cardNumber: Yup.string().min(16, 'Card number must be 16 digits').required('Card number is required'),
    expiryDate: Yup.string().required('Expiry date is required'),
    cvv: Yup.string().min(3, 'CVV must be 3 digits').required('CVV is required'),
});

export default function CheckoutPage() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const shippingFormik = useFormik({
        initialValues: {
            fullName: '',
            address: '',
            email: '',
        },
        validationSchema: ShippingSchema,
        onSubmit: (values) => {
            dispatch(setShippingInfo(values));
            setStep(2);
        },
    });

    const paymentFormik = useFormik({
        initialValues: {
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        },
        validationSchema: PaymentSchema,
        onSubmit: () => {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                router.push('/checkout/success');
            }, 2000);
        },
    });

    return (
        <main className="p-8 bg-beige-100 min-h-screen">
            <h1 className="text-3xl font-bold text-brown-800 mb-6">Checkout</h1>

            {step === 1 && (
                <form onSubmit={shippingFormik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                    <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                    <div className="mb-4">
                        <label className="block text-brown-800">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            onChange={shippingFormik.handleChange}
                            onBlur={shippingFormik.handleBlur}
                            value={shippingFormik.values.fullName}
                            className="w-full border px-3 py-2 rounded-lg text-brown-800"
                        />
                        {shippingFormik.touched.fullName && shippingFormik.errors.fullName && (
                            <p className="text-red-500 text-sm">{shippingFormik.errors.fullName}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-brown-800">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="1234 Main St, Apartment 101"
                            onChange={shippingFormik.handleChange}
                            onBlur={shippingFormik.handleBlur}
                            value={shippingFormik.values.address}
                            className="w-full border px-3 py-2 rounded-lg text-brown-800"
                        />
                        {shippingFormik.touched.address && shippingFormik.errors.address && (
                            <p className="text-red-500 text-sm">{shippingFormik.errors.address}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-brown-800">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="johndoe@example.com"
                            onChange={shippingFormik.handleChange}
                            onBlur={shippingFormik.handleBlur}
                            value={shippingFormik.values.email}
                            className="w-full border px-3 py-2 rounded-lg text-brown-800"
                        />
                        {shippingFormik.touched.email && shippingFormik.errors.email && (
                            <p className="text-red-500 text-sm">{shippingFormik.errors.email}</p>
                        )}
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg">
                        Next: Payment
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={paymentFormik.handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-6">
                    <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                    <div className="mb-4">
                        <label className="block text-brown-800">Card Number</label>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="4242 4242 4242 4242"
                            onChange={paymentFormik.handleChange}
                            onBlur={paymentFormik.handleBlur}
                            value={paymentFormik.values.cardNumber}
                            className="w-full border px-3 py-2 rounded-lg text-brown-800"
                        />
                        {paymentFormik.touched.cardNumber && paymentFormik.errors.cardNumber && (
                            <p className="text-red-500 text-sm">{paymentFormik.errors.cardNumber}</p>
                        )}
                    </div>
                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <label className="block text-brown-800">Expiry Date</label>
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="12/24"
                                onChange={paymentFormik.handleChange}
                                onBlur={paymentFormik.handleBlur}
                                value={paymentFormik.values.expiryDate}
                                className="w-full border px-3 py-2 rounded-lg text-brown-800"
                            />
                            {paymentFormik.touched.expiryDate && paymentFormik.errors.expiryDate && (
                                <p className="text-red-500 text-sm">{paymentFormik.errors.expiryDate}</p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label className="block text-brown-800">CVV</label>
                            <input
                                type="text"
                                name="cvv"
                                placeholder="123"
                                onChange={paymentFormik.handleChange}
                                onBlur={paymentFormik.handleBlur}
                                value={paymentFormik.values.cvv}
                                className="w-full border px-3 py-2 rounded-lg text-brown-800"
                            />
                            {paymentFormik.touched.cvv && paymentFormik.errors.cvv && (
                                <p className="text-red-500 text-sm">{paymentFormik.errors.cvv}</p>
                            )}
                        </div>
                    </div>

                    {loading && (
                        <div className="bg-yellow-100 p-4 rounded-lg mb-4">
                            <p className="text-yellow-600">Processing payment, please wait...</p>
                        </div>
                    )}

                    <div className="bg-green-100 p-4 rounded-lg mb-4">
                        <p className="text-green-600">Discount Applied: $0 due on checkout!</p>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="bg-gray-300 text-brown-800 px-4 py-2 rounded-lg"
                        >
                            Back to Shipping
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg" disabled={loading}>
                            Submit Payment
                        </button>
                    </div>
                </form>
            )}
        </main>
    );
}