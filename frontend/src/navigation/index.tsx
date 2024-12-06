import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import InfoIcon from "@mui/icons-material/Info";

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
        icon: (
          <img
            src="https://github.com/pelongngoan/tuyendungweb/blob/main/frontend/src/assets/england.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
          />
        ),
      },
      {
        title: "NNVHCNNTA",
        path: "job/nnvhcnnta",
        icon: (
          <img
            src="../assets/england.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
          />
        ),
      },
      {
        title: "Hàn",
        path: "job/korean",
        icon: (
          <img
            src="/path/to/korean-flag.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
          />
        ),
      },
      {
        title: "Nhật",
        path: "job/japanese",
        icon: (
          <img
            src="/path/to/korean-flag.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
          />
        ),
      },
      {
        title: "Nga",
        path: "job/russia",
        icon: (
          <img
            src="/path/to/korean-flag.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
          />
        ),
      },
      {
        title: "Trung",
        path: "job/chinese",
        icon: (
          <img
            src="/path/to/korean-flag.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
          />
        ),
      },
      {
        title: "Ả Rập",
        path: "job/arap",
        icon: (
          <img
            src="/path/to/korean-flag.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
          />
        ),
      },
      {
        title: "KTTC",
        path: "job/kttc",
        icon: (
          <img
            src="/path/to/korean-flag.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
          />
        ),
      },
      {
        title: "Đức",
        path: "job/german",
        icon: (
          <img
            src="/path/to/korean-flag.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
          />
        ),
      },
      {
        title: "Pháp",
        path: "job/french",
        icon: (
          <img
            src="/path/to/korean-flag.svg"
            alt="Hàn"
            style={{ width: 24, height: 24 }}
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
