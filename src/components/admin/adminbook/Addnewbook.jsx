import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewCourse } from '../../../actions/book';
import { withRouter } from 'react-router-dom';
import { useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';





const Addnewbook = ({ history }) => {



    const [title, setTitle] = useState();
    const [price, setPrice] = useState();
    const [info, setInfo] = useState();
    const [imageUrl, setimageUrl] = useState();
    const [, forceUpdate] = useState();


    const validator = useRef(
        new SimpleReactValidator({
            messages: {
                required: "پر کردن این فیلد الزامی میباشد",
                min: "کمتر از 5 کاراکتر نباید باشد",
                email: "ایمیل نوشته شده صحیح نمی باشد",
                integer:"باید عدد یاشد"
            },
            element: message => <div style={{ color: "red" }}>{message}</div>
        })
    );


    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            if (validator.current.allValid()) {
                let data = new FormData();
                data.append("title", title);
                data.append("price", Number.parseInt(price));
                data.append("imageUrl", event.target.imageUrl.files[0]);
                data.append("info", info);

                dispatch(createNewCourse(data));
                history.push("/dashboard")
            }
            else {
                validator.current.showMessages();
                forceUpdate(1);
            }
        } catch (ex) {
            console.log(ex);
        }
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
                            onChange={(e) => {
                                setTitle(e.target.value);
                                validator.current.showMessageFor(
                                    "title"
                                );
                            }}
                        />
                        {validator.current.message("title",title,"required|min:5")}
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

export default withRouter(Addnewbook);