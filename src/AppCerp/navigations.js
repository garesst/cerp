export const navigations = [
  {
    name: "Dashboard",
    description: "Lorem ipsum dolor sit.",
    path: "/dashboard/v1",
    type: "link",
    icon: "i-Bar-Chart",
  },
  {
    name: "Booking",
    description: "Lorem ipsum dolor sit.",
    type: "dropDown",
    icon: "i-Library",
    sub: [
      {
        icon: "i-Split-Horizontal-2-Window",
        name: "Agendar Cita",
        path: "/uikits/accordions",
        type: "link",
      },
    ],
  },
];
