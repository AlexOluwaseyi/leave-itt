import { Home, Users, Settings, LayoutDashboard, History } from "lucide-react";

export const navLinks = [
    { icon: Home, text: "Home", href: "/" },
    { icon: LayoutDashboard, text: "Dashboard", href: "/dashboard" },
    { icon: Users, text: "Teams", href: "/teams" },
    { icon: History, text: "History", href: "/history" },
    { icon: Settings, text: "Settings", href: "/settings" },
];

export const user = {
    id: "1",
    username: "admin001",
    name: "Test User",
    role: "MEMBER",
    status: "ACTIVE",
    password:
        "$2b$10$pfz0U9cIzMdSGYcZpFMX2uJsYgGr91NliMwJuCqOWCMAeY0juMTmu", // hashed password for "password123"
    teamId: "team123",
    managerId: "manager123",
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