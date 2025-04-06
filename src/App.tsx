
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApplicationProvider } from "./context/ApplicationContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Tasks from "./pages/Tasks";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ApplicationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </ApplicationProvider>
  </QueryClientProvider>
);

export default App;
