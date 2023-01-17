import ContactPage from "../pages/ContactPage";
import HomeTabs from "../components/HomeTabs";
import SettingsPage from "../pages/SettingsPage";
import ManagePatients from "../pages/ManagePatientsPage";
import ManagePatientsPage from "../pages/ManagePatientsPage";
import ProfilePage from "../pages/ProfilePage";
import I9iFrame from "../components/Tasks/I9iFrame";
import DOH from "../components/Tasks/DOH";
import Enrollment from "../components/Tasks/Enrollment";
import DemoInfo from "../components/Tasks/DemoInfo";
import NurseVisit from "../components/Tasks/NurseVisit";
import WelcomeCall from "../components/Tasks/WelcomeCall";
import HealthAssessment from "../components/Tasks/HealthAssessment";
import Authorization from "../components/Tasks/Authorization";
import Other from "../components/Tasks/Other";

export const menuItems = {
  caregiver: [
    {
      title: "Demographic Information",
      link: "/?page=intake",
    },
    {
      title: "Employee Documents",
      link: "/?page=i9",
    },
    {
      title: "Health Assessment",
      link: "/?page=health_assessment",
    },
    {
      title: "Welcome Call",
      link: "/?page=welcome_call",
    },
    {
      title: "Enrollment Orientation",
      link: "/?page=orientation",
    },
    {
      title: "Other Documents",
      link: "/?page=other",
    },
  ],
  patient: [
    {
      title: "Demographic Information",
      link: "/?page=demographics",
    },
    {
      title: "Medicaid Nurse Visit",
      link: "/?page=nurse_visit",
    },
    {
      title: "Doctor Order DOH",
      link: "/?page=doh",
    },
    {
      title: "Authorization",
      link: "/?page=demographics",
    },
    {
      title: "Enrollment Orientation",
      link: "/?page=orientation",
    },
  ],
};

export const contactItems = {
  newYork: [
    {
      title: "New Hyde park",
      address: "1979 Marcus Ave",
      address2: "Suite C115",
      local: "New Hyde Park, NY 11042",
      number: "(718) 606-7473",
    },
    {
      title: "Queens",
      address: "118-35 Queens Blvd",
      address2: "Suite 414",
      local: "Forest Hills, NY 11375",
      number: "(718) 514-2199",
    },
    {
      title: "Bronx",
      address: "749 E 135th St",
      address2: "Suite 105",
      local: "The Bronx, NY 10454",
      number: "(718) 866-3479",
    },
    {
      title: "Brooklyn (Kings)",
      address: "300 Cadman Plaza West",
      address2: "Suite 12093",
      local: "Brooklyn, NY 11201",
      number: "(718) 412-0527",
    },
    {
      title: "Buffalo (Erie)",
      address: "300 International Drive",
      address2: "Suite 149",
      local: "Williamsville, NY 14221",
      number: "(716) 215-2429",
    },
    {
      title: "Plattsburgh",
      address: "20 Miller St.",
      address2: "Suite 200",
      local: "Plattsburgh, NY 12901",
      number: "(518) 501-0983",
    },
    {
      title: "Rochester (Monroe)",
      address: "510 Clinton Square",
      address2: "Suite 538",
      local: "Rochester, NY 14604",
      number: "(585) 535-9105",
    },
    {
      title: "Syracuse (Onondaga)",
      address: "4583 North St",
      address2: "Suite 2",
      local: "Jamesville, NY 13078",
      number: "(315) 563-2203",
    },
    {
      title: "Manhattan",
      address: "127 West 30th Street",
      address2: "9th Floor",
      local: "New York, NY 10001",
      number: "(646) 461-4844",
    },
    {
      title: "Melville, Long Island",
      address: "445 Broad Hollow Road",
      address2: "Suite 25",
      local: "Melville, New York 11747",
      number: "(718) 989-3734",
    },
    {
      title: "Suffolk",
      address: "150 Motor Parkway",
      address2: " Suite 414",
      local: "Hauppauge, NY 11788",
      number: "(631) 201-0376",
    },
    {
      title: "Albany",
      address: "418 Broadway",
      address2: "2nd Floor",
      local: "Albany, NY 12207",
      number: "(518) 659-0106",
    },
    {
      title: "Hudson Valley",
      address: "115 Broadway",
      address2: "Suite #3",
      local: "Newburgh NY 12550",
    },
    {
      title: "Westchester (Yonkers)",
      address: "73 Market Street",
      address2: "Suite 350",
      local: "Yonkers, NY 10710",
      number: "(914) 415-5978",
    },
  ],
  nevada: [
    {
      title: "Las Vegas",
      address: "4245 South Grand Canyon",
      address2: "Suite 226",
      local: "Las Vegas, NV 89147",
      number: "(866) 935-4709",
    },
  ],

  missouri: [
    {
      title: "Kansas City",
      address: "1301 Oak Street",
      address2: "Suite 102",
      local: "Kansas City, MO 64106",
      number: "(816) 281-1359",
    },
    {
      title: "St. Charles",
      address: "119 S. Main Street",
      address2: "Office #44",
      local: "St. Charles, MO 63301",
      number: "(816) 307-0361",
    },
    {
      title: "Springfield",
      address: "205 Park Central East",
      address2: "Suite 303",
      local: "Springfield, MO 65806",
      number: "(816) 307-0361",
    },
  ],
  philadelphia: [
    {
      title: "Philadelphia",
      address: "1700 Market St.",
      address2: "Suite 1005",
      local: "Philadelphia, PA 19103",
      number: "(267) 318-4719",
    },
  ],
};

export const nextButtonStyle =
  "border-2 border-[#eb5e1a] px-3 py-2  w-[150px] md:w-[200px] lg:w-[200px] rounded-md cursor-pointer hover:transition-all hover:scale-95 hover:shadow-sm hover:bg-[#eb5e1a] hover:border-[#15284b] shadow-md shadow-slate-500 outline-none bg-[#12385a] font-semibold text-white";

export const statesArr: string[] = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export const pageRoutes = (page: string): JSX.Element => {
  switch (page) {
    case "home":
      return <HomeTabs />;
    case "contact":
      return <ContactPage />;
    case "manage_patients":
      return <ManagePatientsPage />;
    case "settings":
      return <SettingsPage />;
    case "profile":
      return <ProfilePage />;
    case "i9":
      return <I9iFrame />;
    case "otherDocs":
      return <Other />;
    case "doh":
      return <DOH />;
    case "enrollment":
      return <Enrollment />;
    case "demo":
      return <DemoInfo />;
    case "nurse_visit":
      return <NurseVisit />;
    case "welcome_call":
      return <WelcomeCall />;
    case "health_assessment":
      return <HealthAssessment />;
    case "authorization":
      return <Authorization />;
    case "other":
      return <Other />;
    default:
      return <HomeTabs />;
  }
};
