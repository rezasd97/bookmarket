import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Book = () => {

    const courses = useSelector(state => state.courses);

    return (
        <div className="row">
            {courses.map(course => (
                <div
                    key={course._id}
                    className="col-lg-3 col-md-4 col-sm-6 col-xs-12 term-col"
                >
                    <article>
                        <Link
                            to="/"
                            className="img-layer"
                        >
                            <img
                                src={`http://localhost:4000/${course.imageUrl}`}
                            />
                        </Link>
                        <h2>
                            <Link to="/">
                                {course.title}

                            </Link>
                        </h2>
                        <span>
                            قیمت: {course.price === 0
                                ? "رایگان"
                                : `${course.price}`}</span>

                    </article>
                </div>
            ))}
        </div>





    );
}

export default Book;