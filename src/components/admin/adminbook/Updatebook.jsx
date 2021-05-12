import React, { useEffect } from 'react';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleCourseUpdate } from '../../../actions/book';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Updatebook = ({ history }) => {
    const course = useSelector(state => state.course);
    const dispatch = useDispatch();

    const [courseId, setCourseId] = useState();
    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [info, setInfo] = useState();
    const [imageUrl, setimageUrl] = useState();

    useEffect(() => {
        setTitle(course.title);
        setPrice(course.price);
        setInfo(course.info);
        setimageUrl(course.imageUrl);
        setCourseId(course._id);

        return () => {
            setTitle();
            setPrice();
            setInfo();
            setimageUrl();
            setCourseId();
        }

    }, [course])

    const handleSubmit = (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append("title", title);
        data.append("price", price);
        if (event.target.imageUrl.files[0])
            data.append("imageUrl", event.target.imageUrl.files[0]);
        else data.append("imageUrl", imageUrl);
        data.append("info", info);
        dispatch(handleCourseUpdate(courseId, data));
        history.push("/dashboard");
    };


    return (
        <section style={{ marginTop: "5em", marginRight: "2em" }}>
            <div className="container">
                <form onSubmit={handleSubmit}>

                    <div className="form-outline mb-4">
                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            placeholder="عنوان دوره"
                            aria-describedby="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <label className="form-label" >نام کتاب</label>
                    </div>


                    <div className="form-outline mb-4">
                        <input
                            type="text"
                            name="price"
                            className="form-control"
                            placeholder="قیمت دوره به تومان"
                            aria-describedby="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <label className="form-label" >price</label>
                    </div>


                    <div className="form-outline mb-4">
                        <textarea
                            name="info"
                            placeholder="توضیحات دوره"
                            className="form-control"
                            style={{ marginBottom: 3 }}
                            value={info}
                            onChange={(e) => setInfo(e.target.value)}
                        />
                        <label className="form-label" >info</label>
                    </div>

                    <input
                        type="file"
                        name="imageUrl"
                        className="form-control mb-2"
                        aria-describedby="imageUrl"
                    />

                    <button type="submit" className="btn btn-primary ">ساخت کتاب</button>
                </form>
            </div>
        </section>
    );
}

export default withRouter(Updatebook);