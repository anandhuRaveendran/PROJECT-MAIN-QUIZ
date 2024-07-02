
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainLayout from './layouts/MainLayout'
import Dashboardpage from "./pages/Dashboardpage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import Profilepage from "./pages/Profilepage";
import CreateQuizpage from "./pages/CreateQuizpage";
import Joinquizpage from "./pages/Joinquizpage";
import Quizdisplaypage from "./pages/Quizdisplaypage";
import Resultpage from "./pages/Resultpage";
import LeaderBoardpage from "./pages/LeaderBoardpage";
import QuizDetailspage from "./pages/QuizDetailspage";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Loginpage />} />
          <Route path="/home" element={<Dashboardpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/createquiz" element={<CreateQuizpage />} />
          <Route path="/joinquiz" element={<Joinquizpage />} />
          <Route path="/quizdisplay" element={<Quizdisplaypage />} />
          <Route path="/result" element={<Resultpage />} />
          <Route path="/leaderboard" element={<LeaderBoardpage />} />
          <Route path="/viewquiz" element={<QuizDetailspage />} />


        </Route>
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App
