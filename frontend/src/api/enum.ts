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
export { ROLE, MAYJOR };
