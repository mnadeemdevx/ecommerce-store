"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import axios from "axios";
import toast from "react-hot-toast";

import useCart from "@/hooks/use-cart";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";

const Summary = () => {
    const searchParams = useSearchParams();

    const items = useCart((state) => state.items);
    const removeAll = useCart((state) => state.removeAll);

    const totalPrice = items.reduce((total, item) => {
        return total + Number(item.price);
    }, 0);

    const onCheckout = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
                {
                    productIds: items.map((item) => item.id),
                },
            );
            window.location = response.data.url;
        } catch (error) {
            console.error("Checkout error:", error);
            toast.error("Checkout failed. Please try again.");
        }
    };

    useEffect(() => {
        if (searchParams.get("success")) {
            toast.success("Payment completed.");
            removeAll();
        }
        if (searchParams.get("cancelled")) {
            toast.error("Something went wrong.");
        }
    }, [searchParams, removeAll]);

    return (
        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">
                        Order total
                    </div>
                    <Currency value={totalPrice} />
                </div>
            </div>
            <Button className="mt-6 w-full" onClick={onCheckout} disabled={items.length === 0}>
                Checkout
            </Button>
        </div>
    );
};

export default Summary;
