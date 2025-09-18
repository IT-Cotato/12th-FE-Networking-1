import React from "react";
import { useThemeStore } from "../stores/themeStore";

interface MovieFormProps {
    newTitle: string;
    setNewTitle: (value: string) => void;
    newDirector: string;
    setNewDirector: (value: string) => void;
    newYear: number | "";
    setNewYear: (value: number | "") => void;
    newGenre: string;
    setNewGenre: (value: string) => void;
    newRating: number | "";
    setNewRating: (value: number | "") => void;
    onSubmit: (e: React.FormEvent) => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({
    newTitle, setNewTitle,
    newDirector, setNewDirector,
    newYear, setNewYear,
    newGenre, setNewGenre,
    newRating, setNewRating,
    onSubmit,
}) => {
    const { currentTheme } = useThemeStore();
    return (
        <div 
            style={{
                marginBottom: "24px",
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: currentTheme.componentBg,
                border: `1px solid ${currentTheme.border}`,
            }}
        >
            <h2>영화 추가</h2>
            <form
                onSubmit={onSubmit}
                style={{display: "flex", gap: "12px", flexWrap: "wrap"}}
            >
                <input
                    type="text"
                    placeholder="제목"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: `1px solid ${currentTheme.border}`,
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.text
                    }}
                />
                <input
                    type="text"
                    placeholder="감독"
                    value={newDirector}
                    onChange={(e) => setNewDirector(e.target.value)}
                    style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: `1px solid ${currentTheme.border}`,
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.text,
                    }}
                />
                <input
                    type="number"
                    placeholder="연도"
                    value={newYear}
                    onChange={(e) => setNewYear(Number(e.target.value))}
                    style={{
                        padding: "8px",
                        borderRadius: "8px",
                        border: `1px solid ${currentTheme.border}`,
                        backgroundColor: currentTheme.inputBg,
                        color: currentTheme.text,
                        width: "80px",
                    }}
                />
                <input
                    type="text"
                    placeholder="장르"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: `1px solid ${currentTheme.border}`,
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.text,
                    }}
                />
                <input
                    type="number"
                    placeholder="평점"
                    value={newRating}
                    onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0 && val <= 10) setNewRating(val);
                    }}
                    style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: `1px solid ${currentTheme.border}`,
                    backgroundColor: currentTheme.inputBg,
                    color: currentTheme.text,
                    width: "100px",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        padding: "8px 16px",
                        backgroundColor: currentTheme.buttonBg,
                        color: currentTheme.buttonText,
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                    }}
                >
                    추가
                </button>
            </form>
        </div>
    )
}