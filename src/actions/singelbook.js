
import { getCourse } from './../services/bookService';

export const getSingleCourse = courseId => {
    return async dispatch => {
        const { data } = await getCourse(courseId);
        await dispatch({ type: "GET_COURSE", payload: data.course });
        
    };
};
