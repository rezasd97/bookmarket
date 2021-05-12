import http from "./httpService";
import config from "./config.json";

export const getCourses=()=>{
    return http.get(`${config.localapi}/api/courses`);
}
export const getCourse = (courseId) => {
    return http.get(`${config.localapi}/api/course/${courseId}`);
};

export const newCourse = (course) => {
    return http.post(`${config.localapi}/api/course`, course);
};

export const deleteCourse = (courseId) => {
    return http.delete(`${config.localapi}/api/course/${courseId}`);
};

export const updateCourse = (courseId, course) => {
    return http.put(`${config.localapi}/api/course/${courseId}`, course);
};
