import { Route, Routes } from "react-router-dom";
import { HomePage } from "@/app/HomePage";
import { RootLayout } from "@/layouts/RootLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}
