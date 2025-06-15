import { Home, Users, Settings, LayoutDashboard, History } from "lucide-react";

export const navLinks = [
    { icon: Home, text: "Home", href: "/" },
    { icon: LayoutDashboard, text: "Dashboard", href: "/dashboard" },
    { icon: Users, text: "Teams", href: "/teams" },
    { icon: History, text: "History", href: "/history" },
    { icon: Settings, text: "Settings", href: "/settings" },
];

export const mockUser = {
    name: "John Doe",
    role: "admin",
    loggedIn: true,
};

export const teamMembers = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "ADMIN",
        status: "ACTIVE",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "USER",
        status: "ACTIVE",
    },
    {
        id: 3,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "USER",
        status: "ACTIVE",
    },
    {
        id: 5,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "USER",
        status: "ACTIVE",
    },
    {
        id: 4,
        name: "Bob Wilson",
        email: "bob@example.com",
        role: "USER",
        status: "SUSPENDED",
    },
    {
        id: 6,
        name: "Bob Wilson",
        email: "bob@example.com",
        role: "ADMIN",
        status: "SUSPENDED",
    },
];