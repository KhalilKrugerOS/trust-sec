import { ReactNode } from "react";

export default function CoursesLayout({ children }: { children: ReactNode }) {
    return <div className="flex flex-col m-4 justify-center items-center">
        <h1 className="text-3xl font-bold mb-4 ">Courses</h1>
        {children}
        </div>;
}