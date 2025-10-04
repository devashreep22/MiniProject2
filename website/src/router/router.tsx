import AuthGuard from "@/components/common/AuthGuard";
import AuthPage from "@/pages/Main/AuthPage";
import HomePage from "@/pages/Main/HomePage";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />

            {/* protected routes */}
            <Route element={<AuthGuard roles={["buyer"]} />}>
                <Route path="/buyer" element={<div>Buyer Dashboard</div>} />
            </Route>
            <Route element={<AuthGuard roles={["farmer"]} />}>
                <Route path="/farmer" element={<div>Farmer Dashboard</div>} />
            </Route>
            <Route element={<AuthGuard roles={["admin"]} />}>
                <Route path="/admin" element={<div>Admin Dashboard</div>} />
            </Route>
        </>
    )
)

export default router;