enum ROLE {
  ADMIN = "ADMIN",
  USER = "USER",
}
enum MAYJOR {
  England = "England",
  Arab = "Arab",
  China = "China",
  France = "France",
  Germany = "Germany",
  Japan = "Japan",
  Korea = "Korea",
  Russia = "Russia",
  Economy = "Economy",
  Tradition = "Tradition",
}
enum MAJOR {
  Translator = "Translator",
  Education = "Education",
  Travel = "Travel",
  Other = "Other",
}
export const MAYJOR_TRANSLATION = {
  [MAYJOR.England]: "Anh",
  [MAYJOR.Arab]: "Ả Rập",
  [MAYJOR.China]: "Trung Quốc",
  [MAYJOR.France]: "Pháp",
  [MAYJOR.Germany]: "Đức",
  [MAYJOR.Japan]: "Nhật Bản",
  [MAYJOR.Korea]: "Hàn Quốc",
  [MAYJOR.Russia]: "Nga",
  [MAYJOR.Economy]: "Kinh tế",
  [MAYJOR.Tradition]: "Truyền thống",
};
export const MAJOR_TRANSLATION = {
  [MAJOR.Education]: "Giáo dục",
  [MAJOR.Translator]: "Biên phiên dịch",
  [MAJOR.Travel]: "Du lịch",
  [MAJOR.Other]: "Các ngành khác",
};
export { ROLE, MAYJOR, MAJOR };
