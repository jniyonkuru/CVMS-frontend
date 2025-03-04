import React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const CVMSLogo: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 300 100" sx={{ fontSize: 80 }}>
      {/* Circle representing community */}
      <circle cx="50" cy="50" r="40" fill="#000" stroke="white" strokeWidth="4" />
      
      {/* Checkmark representing volunteering */}
      <path
        d="M35 50 L48 63 L70 35"
        stroke="white"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      {/* Text CVMS */}
      <text x="100" y="60" fontSize="48" fill="#fafafa" fontWeight="bold" fontFamily="Arial">
        CVMS
      </text>
    </SvgIcon>
  );
};

export default CVMSLogo;
