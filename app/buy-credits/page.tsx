"use client";
import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import Loader from "@/components/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { saveCreditToDb } from "@/actions/credit";
import { useVideo } from "@/context/video";

export default function BuyCredits() {
  const [{ isPending }] = usePayPalScriptReducer();
  const [selected, setSelected] = React.useState({ credits: 10, amount: 5.0 });

  const { credits, getUserCredits } = useVideo();

  const creditOptions = [
    { credits: 10, amount: 5.0 },
    { credits: 20, amount: 10.0 },
    { credits: 50, amount: 20.0 },
  ];

  const handleSuccess = async (details: any) => {
    // console.log(details);
    const amount = parseFloat(details.purchase_units[0].amount.value);
    const credits = parseInt(details.purchase_units[0].custom_id, 10);

    try {
      const credit = await saveCreditToDb(amount, credits);
      getUserCredits();
      toast.success(
        `Transaction completed by ${details.payer.name.given_name}`
      );
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleError = async (error: any) => {
    console.log(error);
    toast.error("An error occurred. Please try again.");
  };

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Buy Credits
          </CardTitle>
          <br />
          <p className="text-center bg-green-500 p-2 rounded-md mt-5">
            You currently have{" "}
            <span className="font-bold text-primary">{credits}</span> credits
          </p>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2 justify-between mb-6">
            {creditOptions.map((option) => (
              <Button
                key={option.credits}
                variant={
                  option.credits === selected.credits ? "default" : "outline"
                }
                onClick={() => setSelected(option)}
                className="h-10"
              >
                {option.credits} Credits - ${option.amount.toFixed(2)}
              </Button>
            ))}
          </div>

          <div className="relative z-0">
            <PayPalButtons
              key={selected.credits}
              createOrder={(data, actions: any) => {
                const price = selected.amount.toFixed(2);
                const credits = selected.credits.toString();

                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: "AUD",
                        value: price,
                      },
                      custom_id: credits,
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions?.order?.capture();
                handleSuccess(details);
              }}
              onError={handleError}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
