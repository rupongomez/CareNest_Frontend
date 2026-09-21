const prefix = "/doctor";

export const doctorRoutes = [
  {
    title: "Schedule ",
    url: "#",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "Create Schedule",
        url: `${prefix}`,
      },
    ],
  },
  {
    title: "App Settings",
    url: "#",
    items: [
      {
        title: "Routing",
        url: "#",
      },
      {
        title: "Data Fetching",
        url: "#",
        isActive: true,
      },
    ],
  },
];
