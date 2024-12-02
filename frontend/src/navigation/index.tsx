import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import InfoIcon from "@mui/icons-material/Info";
import TranslateIcon from "@mui/icons-material/Translate"; // Example icon for "Sư phạm Tiếng Anh"
import LanguageIcon from "@mui/icons-material/Language"; // Example icon for "Hàn" etc.

interface NavItem {
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
        title: "Sư phạm Tiếng Anh",
        path: "job/english",
        icon: <TranslateIcon />,
      },
      { title: "NNVHCNNTA", path: "job/nnvhcnnta", icon: <LanguageIcon /> },
      { title: "Hàn", path: "job/korean", icon: <LanguageIcon /> },
      { title: "Nhật", path: "job/japanese", icon: <LanguageIcon /> },
      { title: "Nga", path: "job/russia", icon: <LanguageIcon /> },
      { title: "Trung", path: "job/chinese", icon: <LanguageIcon /> },
      { title: "Ả Rập", path: "job/arap", icon: <LanguageIcon /> },
      { title: "KTTC", path: "job/kttc", icon: <LanguageIcon /> },
      { title: "Đức", path: "job/german", icon: <LanguageIcon /> },
      { title: "Pháp", path: "job/french", icon: <LanguageIcon /> },
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
