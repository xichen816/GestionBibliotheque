import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from "./src/home/HomePage";
import Question1 from "./src/page/question1";
import Question2 from "./src/page/question2";
import Question3 from "./src/page/question3";
import Question4 from "./src/page/question4";

export const Routing = () => {
    const location = useLocation();

    return (
        <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/question1" element={<Question1 />} />
            <Route path="/question2" element={<Question2 />} />
            <Route path="/question3" element={<Question3 />} />
            <Route path="/question4" element={<Question4 />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
