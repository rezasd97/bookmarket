import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { DeletedCourse } from './../../actions/book';
import { getSingleCourse } from './../../actions/singelbook';


const Dashbordadmin = () => {
    const courses = useSelector(state => state.courses);
    const dis = useDispatch();


    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    useEffect(() => setList(courses), [courses]);
    const filtercourses = list.filter((course) => course.title.includes(search));

    return (
        <section style={{ marginTop: "5em", marginRight: "2em" }}>
            <div className="container">
                <div>
                    <h3 className="alert alert-info text-center">
                        لیست کتاب  ها
                    </h3>
                    <div className="row inline-block">
                        
                        <input
                            type="text"
                            placeholder="جستجوی کتاب"
                            onChange={e => setSearch(e.target.value)}
                            className="form-control"
                            style={{
                                width: "50%",
                                float: "right",
                                marginLeft: "2em",
                            }}
                        />
                    </div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">نام کتاب </th>
                                <th scope="col">تصویر کتاب</th>
                                <th scope="col">قیمت کتاب (تومان)</th>
                                <th scope="col">ویرایش</th>
                                <th scope="col">حذف</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtercourses.map((course) => (
                                <tr key={course._id}>
                                    <td>{course.title}</td>
                                    <td>
                                        <a
                                            href={`http://localhost:4000/${course.imageUrl}`}
                                            target="_blank"
                                            className="btn btn-info btn-sm"
                                        >
                                            نمایش تصویر
                                        </a>
                                    </td>
                                    <td>
                                        {course.price === 0
                                            ? "رایگان"
                                            : `${course.price}`}
                                    </td>
                                    <td>

                                        <NavLink to="/updatebook">
                                            <button className="btn btn-warning"
                                                onClick={() => dis(getSingleCourse(course._id))}

                                            >
                                                ویرایش
                                        </button>
                                        </NavLink>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                const confirmBox = window.confirm(
                                                    "مطمئنی میخوای حذفش کنی"
                                                )
                                                if (confirmBox === true) {
                                                    dis(DeletedCourse(course._id))
                                                }
                                            }}>
                                                حذف
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="navbar-fixed-bottom text-center footer">

                </div>
            </div>
        </section>
    );
};

export default Dashbordadmin;
