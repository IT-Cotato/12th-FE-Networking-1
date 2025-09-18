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
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-pink-200 p-6 mb-6"
            style={{
                backgroundColor: currentTheme.componentBg,
                backdropFilter: 'blur(8px)',
                borderRadius: '16px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${currentTheme.border}`,
                padding: '24px',
                marginBottom: '24px'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: currentTheme.text, margin: 0 }}>영화 추가</h2>
            </div>
            <form
                onSubmit={onSubmit}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>제목</label>
                    <input
                        type="text"
                        placeholder="영화 제목을 입력하세요"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: `1px solid ${currentTheme.border}`,
                            backgroundColor: currentTheme.inputBg,
                            color: currentTheme.text,
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>감독</label>
                    <input
                        type="text"
                        placeholder="감독 이름"
                        value={newDirector}
                        onChange={(e) => setNewDirector(e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: `1px solid ${currentTheme.border}`,
                            backgroundColor: currentTheme.inputBg,
                            color: currentTheme.text,
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>연도</label>
                    <input
                        type="number"
                        placeholder="2024"
                        value={newYear}
                        onChange={(e) => setNewYear(Number(e.target.value))}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: `1px solid ${currentTheme.border}`,
                            backgroundColor: currentTheme.inputBg,
                            color: currentTheme.text,
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>장르</label>
                    <input
                        type="text"
                        placeholder="액션, 로맨스..."
                        value={newGenre}
                        onChange={(e) => setNewGenre(e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: `1px solid ${currentTheme.border}`,
                            backgroundColor: currentTheme.inputBg,
                            color: currentTheme.text,
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '500', color: currentTheme.text }}>평점</label>
                    <input
                        type="number"
                        placeholder="0-10"
                        value={newRating}
                        onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val >= 0 && val <= 10) setNewRating(val);
                        }}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            padding: '12px 16px',
                            borderRadius: '12px',
                            border: `1px solid ${currentTheme.border}`,
                            backgroundColor: currentTheme.inputBg,
                            color: currentTheme.text,
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                    <button
                        type="submit"
                        style={{
                            padding: '12px 32px',
                            backgroundColor: currentTheme.buttonBg,
                            color: currentTheme.buttonText,
                            borderRadius: '12px',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        <span>영화 추가하기</span>
                    </button>
                </div>
            </form>
        </div>
    )
}