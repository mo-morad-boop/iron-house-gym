const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const make = (children, rtlFlip = false) =>
  function Icon({ className = "h-5 w-5" }) {
    return (
      <svg {...base} className={`${className} ${rtlFlip ? "rtl:rotate-180" : ""}`}>
        {children}
      </svg>
    );
  };

export const ChevronIcon = ({ dir = "next", className = "h-5 w-5" }) => (
  <svg {...base} className={`${className} rtl:rotate-180`}>
    <path d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

export const CloseIcon = make(<path d="M6 6l12 12M18 6L6 18" />);
export const MenuIcon = make(<path d="M4 7h16M4 12h16M4 17h16" />);
export const GlobeIcon = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
  </>
);
export const CheckIcon = make(<path d="M5 12l5 5 9-10" />);
export const PinIcon = make(
  <>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
);
export const ArrowUpIcon = make(<path d="M12 19V5M5 12l7-7 7 7" />);
export const UnlimitedIcon = make(<path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4" />);
export const ExpandIcon = make(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />);
export const WhatsAppIcon = make(
  <path d="M21 11.5a8.4 8.4 0 01-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1121 11.5z" />
);
export const InstagramIcon = make(
  <>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" />
  </>
);
export const FacebookIcon = make(
  <path d="M15 3h-2.5A4.5 4.5 0 008 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5a.5.5 0 01.5-.5H15z" />
);

export const DumbbellIcon = ({ className = "h-6 w-12" }) => (
  <svg
    viewBox="0 0 48 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M4 5v14M10 2v20M38 2v20M44 5v14M10 12h28" />
  </svg>
);