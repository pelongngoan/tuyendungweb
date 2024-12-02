import SettingsIcon from "@mui/icons-material/Settings";
import "./Dashboard.css";
const cardProps = () => [
  {
    title: "CPU",
    description: "X/Y - X - số GPU hoạt động / tổng GPU",
    icon: <SettingsIcon />,
  },
  {
    title: "GPU",
    description: "X/Y - X - số GPU hoạt động / tổng GPU",
    icon: <SettingsIcon />,
  },
  {
    title: "SỐ YỀU CẦU CẤP PHÁT ĐANG CHỜ",
    description: "X",
    icon: <SettingsIcon />,
  },
  {
    title: "SỐ YÊU CẦU ĐANG XỬ LÝ ",
    description: "Y",
    icon: <SettingsIcon />,
  },
];
interface Cat {
  name: string;
  age: number;
  gender: string;
  color: string;
  activityLevel?: string;
  favoriteFood?: string;
}
const data: Cat[] = [
  {
    name: "Mittens",
    color: "black",
    age: 2,
    gender: "female",
    activityLevel: "hight",
    favoriteFood: "milk",
  },
  {
    name: "Mons",
    color: "grey",
    age: 2,
    gender: "male",
    favoriteFood: "old socks",
    activityLevel: "medium",
  },
  {
    name: "Luna",
    color: "black",
    age: 2,
    gender: "female",
    activityLevel: "medium",
    favoriteFood: "fish",
  },
  {
    name: "Bella",
    color: "grey",
    age: 1,
    gender: "female",
    activityLevel: "high",
    favoriteFood: "mice",
  },
  {
    name: "Oliver",
    color: "orange",
    age: 1,
    gender: "male",
    activityLevel: "low",
    favoriteFood: "fish",
  },
];

const Dashboard = () => {
  return <></>;
};

export default Dashboard;
