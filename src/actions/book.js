import { seccess } from './../utils/toastmessage';
import {  newCourse, deleteCourse, updateCourse, getCourses } from './../services/bookService';

export const getAllCourses = () => {
    return async (dispatch) => {
        const { data } = await getCourses();
        await dispatch({
            type: "INIT",
            payload: data.courses
        });

    };
};

export const createNewCourse = (course) => {
    return async (dispatch, getState) => {
        const { data, status } = await newCourse(course);
        if (status === 201) seccess("دوره با موفقیت ساخته شد");
        await dispatch({
            type: "ADD_COURSE",
            payload: [...getState().courses, data.course],
        });
    };
};

export const DeletedCourse = (courseId) => {
    return async (dispatch, getstate) => {
        const courses = [...getstate().courses ];
        const filtercourse  = courses.filter(
            (course) => course._id !== courseId
        );

        try {
            await dispatch({
                type: "DELETE_COURSE",
                payload: [...filtercourse]
            });
            const { status } = await deleteCourse(courseId);
            if (status === 200) {
                seccess("کتاب حذف شد")
            }
        } catch (ex) {
            await dispatch({
                type: "DELETE_COURSE",
                payload: [...courses]
            })
        }
    }
};

export const handleCourseUpdate = (courseId, updatedCourse) => {
    return async (dispatch, getState) => {
        const courses = [...getState().courses];
        const updatedCourses = [...courses];
        const courseIndex = updatedCourses.findIndex(
            (course) => course._id == courseId
        );

        let course = updatedCourses[courseIndex];

        course = { ...Object.fromEntries(updatedCourse) };
        updatedCourses[courseIndex] = course;

        try {
            await dispatch({
                type: "UPDATE_COURSE",
                payload: [...updatedCourses],
            });
            const { data, status } = await updateCourse(
                courseId,
                updatedCourse
            );
            if (status === 200) {
                seccess("کتاب با موفقیت ویرایش شد.");
            }
        } catch (ex) {
            await dispatch({ type: "UPDATE_COURSE", payload: [...courses] });
        }
    };
};



