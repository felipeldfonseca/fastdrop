"use client";

import { Button } from "@repo/ui/button";
import { X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectWallet: () => void;
  onLoginWithEmail: () => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  onConnectWallet,
  onLoginWithEmail,
}: AuthModalProps) {
  const [isRendered, setIsRendered] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
    } else {
      const timer = setTimeout(() => setIsRendered(false), 500); // Slower exit animation
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      onClose();
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [handleClose]);

  if (!isRendered) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity ${isOpen ? 'duration-300 opacity-100' : 'duration-500 opacity-0'}`}
        onClick={handleClose}
      ></div>
      
      {/* Modal Content */}
      <div className={`relative bg-black/80 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl w-full max-w-md m-4 p-8 transition-all ${isOpen ? 'duration-300 opacity-100 transform-none' : 'duration-400 opacity-0 scale-95'}`}>
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold font-display text-white">
            Join us at Fast Drop!
          </h2>
          <p className="text-white/70">
            Register or log in to add projects to your watchlist and get exclusive updates.
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Button 
            onClick={() => {
              onConnectWallet();
              handleClose();
            }}
            className="w-full rounded-full px-4 py-3 text-base font-semibold shadow-lg bg-[--fd-primary] text-black hover:bg-white"
          >
            Connect Wallet
          </Button>
          <Button 
            onClick={() => {
              onLoginWithEmail();
              handleClose();
            }}
            variant="outline"
            className="w-full rounded-full px-4 py-3 text-base font-semibold border-white/20 text-white hover:bg-white hover:text-black"
          >
            Register/Login with Email
          </Button>
        </div>
      </div>
    </div>
  );
} 