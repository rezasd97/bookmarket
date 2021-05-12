import React from "react";

const Header = () => {
    return (
        <React.Fragment>
            <div className="search-form">
                <form>
                    <input
                        type="text"
                        name=""
                        placeholder="نام کتاب بزن!؟"
                    />
                    <button>
                        <i className="zmdi zmdi-search"></i>
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Header;
