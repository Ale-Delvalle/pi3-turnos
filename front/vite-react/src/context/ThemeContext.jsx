import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
    theme: "dark",
    toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Buscar en localStorage
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme;
        }
        // Buscar preferencia del sistema
        const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
        return systemPrefersLight ? "light" : "dark";
    });

    useEffect(() => {
        // Actualizar el atributo data-theme en el elemento :root (html)
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
