import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Shield } from "lucide-react"; 

function calculateStrength(password) {
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  return strength;
}

const PasswordStrengthBar = ({ password }) => {
  const strength = calculateStrength(password);

  const levels = [
    { label: "Enter a password", color: "bg-gray-300", gradient: "from-gray-300 to-gray-400", icon: null },
    { label: "Weak", color: "bg-red-500", gradient: "from-red-500 to-orange-500", icon: <AlertTriangle className="w-4 h-4 text-red-600" /> },
    { label: "Fair", color: "bg-yellow-500", gradient: "from-yellow-400 to-yellow-600", icon: <AlertTriangle className="w-4 h-4 text-yellow-600" /> },
    { label: "Good", color: "bg-blue-500", gradient: "from-blue-400 to-blue-600", icon: <Shield className="w-4 h-4 text-blue-600" /> },
    { label: "Strong", color: "bg-green-500", gradient: "from-green-400 to-green-600", icon: <CheckCircle className="w-4 h-4 text-green-600" /> },
  ];

  const { label, gradient, icon } = levels[strength];

  return (
    <div className="w-[90%] mt-3">
      
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ width: 0 }}
            animate={{ width: strength >= i ? "25%" : "0%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`h-2 rounded ${strength >= i ? `bg-gradient-to-r ${gradient}` : "bg-gray-200"}`}
          />
        ))}
      </div>

     
      <div className="flex items-center gap-2 mt-1 text-xs font-medium text-gray-700">
        {icon}
        <span>{label}</span>
      </div>
    </div>
  );
};

export default PasswordStrengthBar;
