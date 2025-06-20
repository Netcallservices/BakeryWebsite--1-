"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home, ShoppingBag } from "lucide-react";
import confetti from "canvas-confetti";

export default function OrderSuccessPage() {
  useEffect(() => {
    // Trigger confetti animation when component mounts
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2
            }}
            className="flex justify-center mb-6"
          >
            <CheckCircle className="h-24 w-24 text-green-500" />
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Order Placed Successfully!
          </motion.h1>
          
          <motion.p 
            className="text-gray-600 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Thank you for your order. We've received your request and will begin preparing your delicious treats right away.
          </motion.p>
          
          <motion.div
            className="bg-amber-50 rounded-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="font-semibold text-primary mb-4">Order Details</h3>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Number:</span>
              <span className="font-medium">#GTC{Math.floor(10000 + Math.random() * 90000)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order Date:</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-medium">
                {new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <Button asChild className="bg-primary hover:bg-primary/90 text-white">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/menu">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}