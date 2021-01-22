let coursesEn = [];
let coursesFi = [];

const ParseSodexoMenu = (sodexoMenu) => {
  const courses = Object.values(sodexoMenu);
  for (const course of courses) {
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
  }
};
const SodexoModule = {ParseSodexoMenu, coursesFi, coursesEn};
export default SodexoModule;
