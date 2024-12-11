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
import Travel from "../assets/travel.svg";
import Translator from "../assets/translator.svg";
import Education from "../assets/education.svg";
import Other from "../assets/other.svg";

export interface NavItem {
  title: string;
  path: string;
  icon?: JSX.Element;
  children?: NavItem[];
  access?: boolean;
}

const createLanguageChildren = (countryName: string): NavItem[] => [
  {
    title: "Biên phiên dịch",
    path: `/${countryName.toLowerCase()}/translator`,
    icon: (
      <img
        src={Translator}
        alt={countryName}
        style={{ width: "24px", height: "24px" }}
      />
    ),
  },
  {
    title: "Giáo dục",
    path: `/${countryName.toLowerCase()}/education`,
    icon: (
      <img
        src={Education}
        alt={countryName}
        style={{ width: "24px", height: "24px" }}
      />
    ),
  },
  {
    title: "Du lịch",
    path: `/${countryName.toLowerCase()}/travel`,
    icon: (
      <img
        src={Travel}
        alt={countryName}
        style={{ width: "24px", height: "24px" }}
      />
    ),
  },
  {
    title: "Các ngành khác",
    path: `/${countryName.toLowerCase()}/other`,
    icon: (
      <img
        src={Other}
        alt={countryName}
        style={{ width: "24px", height: "24px" }}
      />
    ),
  },
];

export const navigation = (): NavItem[] => [
  {
    title: "Việc thực tập",
    path: "job",
    access: true,
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
        children: createLanguageChildren("English"),
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
        children: createLanguageChildren("Tradition"),
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
        children: createLanguageChildren("Korea"),
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
        children: createLanguageChildren("Japan"),
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
        children: createLanguageChildren("Russia"),
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
        children: createLanguageChildren("China"),
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
        children: createLanguageChildren("Arab"),
      },
      {
        title: "Kinh tế - Tài chính",
        path: "job/Economy",
        icon: (
          <img
            src={Economy}
            alt="Economy"
            style={{ width: "24px", height: "24px" }}
          />
        ),
        children: createLanguageChildren("Economy"),
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
        children: createLanguageChildren("Germany"),
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
        children: createLanguageChildren("France"),
      },
    ],
  },
  {
    title: "Chương trình thực tập và học bổng cá nhân hoá",
    path: "internship",
    access: true,
  },
  {
    title: "Tạo hồ sơ công việc",
    path: "createJob",
    access: false,
  },
  {
    title: "Tạo hồ sơ thực tập",
    path: "internshipCreate",
    access: false,
  },
  {
    title: "About",
    path: "about",
    access: true,
  },
  {
    title: "Đặt câu hỏi",
    path: "chatBox",
    access: true,
  },
];
