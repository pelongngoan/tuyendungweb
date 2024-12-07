import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import InfoIcon from "@mui/icons-material/Info";
import England from "../assets/england.svg";
import Arab from "../assets/arab.svg";
import China from "../assets/china.svg";
import France from "../assets/france.svg";
import Germany from "../assets/germany.svg";
import Japan from "../assets/japan.svg";
import Korea from "../assets/korea.svg";
import Russia from "../assets/russia.svg";
import Economy from "../assets/economy.svg";
import Tradition from "../assets/tradition.svg";

export interface NavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  children?: NavItem[];
}

export const navigation = (): NavItem[] => [
  {
    title: "Việc thực tập",
    path: "job",
    icon: <WorkIcon />,
    children: [
      {
        title: "Tiếng Anh",
        path: "job/England",
        icon: (
          <img
            src={England}
            alt="English"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
      {
        title: "Văn hóa và truyền thông xuyên quốc gia",
        path: "job/Tradition",
        icon: (
          <img
            src={Tradition}
            alt="Tradition"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
      {
        title: "Hàn",
        path: "job/Korea",
        icon: (
          <img
            src={Korea}
            alt="Korea"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
      {
        title: "Nhật",
        path: "job/Japan",
        icon: (
          <img
            src={Japan}
            alt="Japan"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
      {
        title: "Nga",
        path: "job/Russia",
        icon: (
          <img
            src={Russia}
            alt="Russia"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
      {
        title: "Trung",
        path: "job/China",
        icon: (
          <img
            src={China}
            alt="China"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
      {
        title: "Ả Rập",
        path: "job/Arab",
        icon: (
          <img
            src={Arab}
            alt="Arab"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
      {
        title: "Kinh tế - Tài chính",
        path: "job/Economy",
        icon: (
          <img
            src={Economy}
            alt="economy"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
      {
        title: "Đức",
        path: "job/Germany",
        icon: (
          <img
            src={Germany}
            alt="Germany"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
      {
        title: "Pháp",
        path: "job/France",
        icon: (
          <img
            src={France}
            alt="France"
            style={{ width: "24px", height: "24px" }}
          />
        ),
      },
    ],
  },
  {
    title: "Chương trình thực tập",
    path: "company",
    icon: <BusinessIcon />,
    children: [
      { title: "Tech Companies", path: "company/tech", icon: <BusinessIcon /> },
      {
        title: "Finance Companies",
        path: "company/finance",
        icon: <BusinessIcon />,
      },
    ],
  },
  {
    title: "About",
    path: "about",
    icon: <InfoIcon />,
  },
];
